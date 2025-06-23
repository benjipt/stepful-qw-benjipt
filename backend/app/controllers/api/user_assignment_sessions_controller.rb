class Api::UserAssignmentSessionsController < ApplicationController
  # POST /api/user_assignment_sessions
  # Starts a new user assignment session for a given userAssignmentId (camelCase, flat param)
  # Expects a parameter `userAssignmentId` in the request body (not nested)
  # If the user_assignment is not found, returns 404
  # If the session is created successfully, returns { success: true, user_assignment_session_id: id }
  # If creation fails, returns 422 with error messages
  def create
    user_assignment_id = params[:userAssignmentId]
    user_assignment = UserAssignment.find(user_assignment_id)
    session = nil
    ActiveRecord::Base.transaction do
      # As a safeguard, close any previous open sessions for this user_assignment should the client fail to close.
      UserAssignmentSession.close_stale_sessions_for(user_assignment)
      session = user_assignment.user_assignment_sessions.create(session_start: Time.current)
      if session.persisted? && user_assignment.not_yet_started?
        user_assignment.status = UserAssignment.statuses[:in_progress]
        user_assignment.save!
      end
      raise ActiveRecord::Rollback unless session.persisted?
    end
    if session&.persisted?
      render json: { success: true, userAssignmentSessionId: session.id }, status: :created
    else
      render json: { errors: session ? session.errors.full_messages : [ 'Session creation failed' ] }, status: :unprocessable_entity
    end
  end

  # PATCH /api/user_assignment_sessions/:id
  # Ends a user assignment session by setting session_end to the current time
  # Also updates the associated user_assignment's total_time_spent by adding this session's total_time
  # If the session is already ended, returns 422
  # If the session or update fails, returns 422 with error messages
  # On success, returns { success: true }
  def update
    session = UserAssignmentSession.find(params[:id])
    if session.session_end.present?
      render json: { error: 'Session already ended' }, status: :unprocessable_entity and return
    end

    session.session_end = Time.current
    session.total_time = (session.session_end - session.session_start).to_i

    UserAssignment.transaction do
      session.save!
      user_assignment = session.user_assignment
      user_assignment.total_time_spent ||= 0
      user_assignment.total_time_spent += session.total_time
      user_assignment.save!
    end

    render json: { success: true }, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
end
