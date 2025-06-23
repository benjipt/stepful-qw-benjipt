require 'swagger_helper'

RSpec.describe 'UserAssignmentQuestions API', type: :request do
  path '/api/user_assignments/{userAssignmentId}/questions' do
    get 'Returns all assignment questions for a given user assignment, including user responses if present' do
      tags 'UserAssignmentQuestions'
      produces 'application/json'
      parameter name: :userAssignmentId, in: :path, type: :string, description: 'User Assignment ID'
      parameter name: :userAssignmentSessionId, in: :query, type: :string, required: true, description: 'User Assignment Session ID (must be active)'

      response '200', 'questions found' do
        schema type: :array, items: {
          type: :object,
          properties: {
            questionId: { type: :integer },
            content: { type: :string },
            choices: { type: :array, items: { type: :string }, nullable: true },
            response: { type: :string, nullable: true },
            points: { type: :integer }
          },
          required: [ 'questionId', 'content', 'choices', 'response', 'points' ]
        }
        run_test!
      end

      response '400', 'userAssignmentSessionId is missing' do
        run_test!
      end

      response '403', 'session is invalid or closed' do
        run_test!
      end

      response '404', 'user assignment not found' do
        run_test!
      end
    end

    post 'Creates a user assignment question response' do
      tags 'UserAssignmentQuestions'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :userAssignmentId, in: :path, type: :string, description: 'User Assignment ID'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          assignmentQuestionId: { type: :integer },
          response: { type: :string }
        },
        required: [ 'assignmentQuestionId', 'response' ]
      }

      response '201', 'response saved' do
        schema type: :object, properties: { success: { type: :boolean } }, required: [ 'success' ]
        run_test!
      end

      response '400', 'missing required params' do
        schema type: :object, properties: { error: { type: :string } }, required: [ 'error' ]
        run_test!
      end

      response '404', 'user assignment or assignment question not found' do
        schema type: :object, properties: { error: { type: :string } }, required: [ 'error' ]
        run_test!
      end

      response '422', 'unprocessable entity' do
        schema type: :object, properties: { success: { type: :boolean } }, required: [ 'success' ]
        run_test!
      end

      response '502', 'LLM grading failed' do
        schema type: :object, properties: {
          error: { type: :string },
          details: { type: :string }
        }, required: [ 'error', 'details' ]
        run_test!
      end
    end
  end
end
