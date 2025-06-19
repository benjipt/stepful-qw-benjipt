class Api::AssignmentQuestionsController < ApplicationController
  # GET /api/assignments/{assignmentId}/questions
  # Returns all assignment questions for a given assignment
  # Expects a path parameter `assignmentId` to identify the assignment
  # Returns an array of AssignmentQuestionSerializer objects
  # Each object contains the details of an assignment question
  # If no assignment is found, returns a 404 error with an appropriate message
  def index
    assignment_id = params[:assignmentId]
    assignment = Assignment.find(assignment_id)
    questions = assignment.assignment_questions
    render json: questions, each_serializer: AssignmentQuestionSerializer
  end
end
