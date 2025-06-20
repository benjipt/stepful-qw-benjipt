class Api::UserAssignmentsController < ApplicationController
  # GET /api/user_assignments
  # Returns the most recent user assignments for a given user
  # Expects a query parameter `userId` to identify the user
  # Returns an array of UserAssignmentSummarySerializer objects
  # Each object contains the latest user assignment for each assignment
  # If no user is found, returns a 404 error with an appropriate message
  def index
    # TODO: use .find instead of .find_by to raise an error automatically if user not found
    user = User.find_by(id: params[:userId])
    return render json: { error: 'User not found' }, status: :not_found unless user

    # Get the most recent user_assignment per assignment for this user
    latest_assignments = user.user_assignments
      .order(assignment_id: :asc, created_at: :desc)
      .group_by(&:assignment_id)
      .map { |_, records| records.first }

    render json: latest_assignments, each_serializer: UserAssignmentSummarySerializer, status: :ok
  end

  # GET /api/user_assignments/:id
  # Returns a single user assignment by id
  # Renders UserAssignmentSummarySerializer or 404 if not found
  def show
    user_assignment = UserAssignment.find(params[:id])
    render json: user_assignment, serializer: UserAssignmentSummarySerializer, status: :ok
  end
end
