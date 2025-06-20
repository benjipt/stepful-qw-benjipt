require 'swagger_helper'

RSpec.describe 'api/user_assignments', type: :request do
  path '/api/user_assignments' do
    get('list user_assignments') do
      tags 'UserAssignments'
      produces 'application/json'
      parameter name: :userId, in: :query, type: :integer, description: 'User ID', required: true

      response(200, 'successful') do
        schema type: :array, items: {
          type: :object,
          properties: {
            assignmentId: { type: :integer },
            title: { type: :string },
            status: { type: :string },
            score: { type: :integer, nullable: true },
            totalTimeSpent: { type: :integer, nullable: true, description: 'Total time spent in seconds' },
            results: {
              type: :object,
              nullable: true,
              properties: {
                totalQuestions: { type: :integer },
                totalCorrect: { type: :integer },
                questions: {
                  type: :array,
                  items: {
                    type: :object,
                    properties: {
                      id: { type: :integer },
                      content: { type: :string },
                      response: { type: :string },
                      correct: { type: :boolean }
                    },
                    required: %w[id content response correct]
                  }
                }
              },
              required: %w[totalQuestions totalCorrect questions]
            }
          },
          required: %w[assignmentId title status]
        }
        let(:userId) { users(:one).id }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/api/user_assignments/{id}' do
    get('show user_assignment') do
      tags 'UserAssignments'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, description: 'UserAssignment ID', required: true

      response(200, 'successful') do
        schema type: :object,
          properties: {
            assignmentId: { type: :integer },
            title: { type: :string },
            status: { type: :string },
            score: { type: :integer, nullable: true },
            totalTimeSpent: { type: :integer, nullable: true, description: 'Total time spent in seconds' },
            results: {
              type: :object,
              nullable: true,
              properties: {
                totalQuestions: { type: :integer },
                totalCorrect: { type: :integer },
                questions: {
                  type: :array,
                  items: {
                    type: :object,
                    properties: {
                      id: { type: :integer },
                      content: { type: :string },
                      response: { type: :string },
                      correct: { type: :boolean }
                    },
                    required: %w[id content response correct]
                  }
                }
              },
              required: %w[totalQuestions totalCorrect questions]
            }
          },
          required: %w[assignmentId title status]

        let(:id) { UserAssignment.first&.id || FactoryBot.create(:user_assignment).id }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end

      response(404, 'not found') do
        let(:id) { -1 }
        run_test!
      end
    end
  end
end
