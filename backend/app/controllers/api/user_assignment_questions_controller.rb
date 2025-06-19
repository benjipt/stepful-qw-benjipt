class Api::UserAssignmentQuestionsController < ApplicationController
  # GET /api/user_assignments/:user_assignment_id/questions
  # Returns all assignment questions for a given user assignment, including user responses if present
  def index
    user_assignment_id = params[:user_assignment_id] || params[:userAssignmentId]
    user_assignment = UserAssignment.find(user_assignment_id)
    assignment = user_assignment.assignment
    assignment_questions = assignment.assignment_questions

    render json: assignment_questions, each_serializer: AssignmentQuestionWithResponseSerializer, scope: user_assignment
  end
end
