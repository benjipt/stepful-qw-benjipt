class Api::UserAssignmentQuestionsController < ApplicationController
  # GET /api/user_assignments/:user_assignment_id/questions
  # Returns all assignment questions for a given user assignment, including user responses if present
  def index
    user_assignment_id = params[:user_assignment_id] || params[:userAssignmentId]
    user_assignment = UserAssignment.find(user_assignment_id)
    assignment = user_assignment.assignment
    assignment_questions = assignment.assignment_questions

    # Preload only the response field for this user_assignment to avoid N+1 queries and save memory
    responses = UserAssignmentQuestion.where(
      user_assignment_id: user_assignment.id,
      assignment_question_id: assignment_questions.pluck(:id)
    ).pluck(:assignment_question_id, :response).to_h

    render json: assignment_questions, each_serializer: AssignmentQuestionSerializer, scope: { user_assignment: user_assignment, responses: responses }
  end
end
