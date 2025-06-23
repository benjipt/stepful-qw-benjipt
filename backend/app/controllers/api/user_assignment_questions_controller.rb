class Api::UserAssignmentQuestionsController < ApplicationController
  # GET /api/user_assignments/:user_assignment_id/questions
  #
  # Required parameters:
  #   - userAssignmentSessionId: The ID of the user assignment session. Must reference an active session (session_start present, session_end nil).
  #
  # Returns:
  #   - 200: All assignment questions for the given user assignment, including user responses if present.
  #   - 400: If userAssignmentSessionId is missing.
  #   - 403: If the session is invalid or closed.
  #
  # Example request:
  #   GET /api/user_assignments/123/questions?userAssignmentSessionId=456
  def index
    user_assignment_id = params[:user_assignment_id] || params[:userAssignmentId]
    user_assignment = UserAssignment.find(user_assignment_id)
    assignment = user_assignment.assignment
    assignment_questions = assignment.assignment_questions

    # Require userAssignmentSessionId
    unless params[:userAssignmentSessionId].present?
      return render json: { error: 'userAssignmentSessionId is required' }, status: :bad_request
    end

    session = UserAssignmentSession.find_by(id: params[:userAssignmentSessionId], user_assignment_id: user_assignment.id)
    unless session&.active?
      return render json: { error: 'Invalid or closed session' }, status: :forbidden
    end

    # Preload only the response field for this user_assignment to avoid N+1 queries and save memory
    responses = UserAssignmentQuestion.where(
      user_assignment_id: user_assignment.id,
      assignment_question_id: assignment_questions.pluck(:id)
    ).pluck(:assignment_question_id, :response).to_h

    render json: assignment_questions, each_serializer: AssignmentQuestionSerializer, scope: { user_assignment: user_assignment, responses: responses }
  end
end
