require 'swagger_helper'

RSpec.describe 'UserAssignmentQuestions API', type: :request do
  path '/api/user_assignments/{userAssignmentId}/questions' do
    get 'Returns all assignment questions for a given user assignment, including user responses if present' do
      tags 'UserAssignmentQuestions'
      produces 'application/json'
      parameter name: :userAssignmentId, in: :path, type: :string, description: 'User Assignment ID'

      response '200', 'questions found' do
        schema type: :array, items: {
          type: :object,
          properties: {
            questionId: { type: :integer },
            content: { type: :string },
            choices: { type: :array, items: { type: :string }, nullable: true },
            response: { type: :string, nullable: true }
          },
          required: [ 'questionId', 'content', 'choices', 'response' ]
        }
        run_test!
      end

      response '404', 'user assignment not found' do
        run_test!
      end
    end
  end
end
