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

  # POST /api/user_assignments/:user_assignment_id/questions
  # Params: userAssignmentId, assignmentQuestionId, response (all camelCase, flat)
  def create
    user_assignment_id = params[:userAssignmentId] || params[:user_assignment_id]
    assignment_question_id = params[:assignmentQuestionId]
    response_text = params[:response]

    unless user_assignment_id && assignment_question_id && response_text
      return render json: { error: 'userAssignmentId, assignmentQuestionId, and response are required' }, status: :bad_request
    end

    user_assignment = UserAssignment.find(user_assignment_id)
    assignment_question = AssignmentQuestion.find(assignment_question_id)

    correct = nil
    if assignment_question.correct_choice.present?
      correct = (response_text.strip == assignment_question.correct_choice.strip)
    else
      # Call LLM proxy to grade
      require 'net/http'
      require 'uri'
      require 'json'
      uri = URI.parse('https://interview-ai.stepful.com/v1/chat/completions')
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      req = Net::HTTP::Post.new(uri.path, {
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer thompson.benji@gmail.com'
      })
      prompt = "Is the following answer correct for the question?\n\nQuestion: #{assignment_question.question_content}\nAnswer: #{response_text}\n\nReply with only 'true' or 'false'."
      req.body = {
        model: 'gpt-4o-2024-08-06',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.0
      }.to_json
      begin
        res = http.request(req)
        llm_result = JSON.parse(res.body)
        llm_content = llm_result.dig('choices', 0, 'message', 'content')
        correct = llm_content.to_s.downcase.include?('true')
      rescue => e
        return render json: { error: 'LLM grading failed', details: e.message }, status: :bad_gateway
      end
    end

    user_assignment_question = UserAssignmentQuestion.new(
      user_assignment_id: user_assignment.id,
      assignment_id: user_assignment.assignment_id,
      assignment_question_id: assignment_question.id,
      response: response_text,
      correct: correct
    )

    if user_assignment_question.save
      user_assignment.complete_if_finished!
      render json: { success: true }, status: :created
    else
      render json: { success: false, errors: user_assignment_question.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
