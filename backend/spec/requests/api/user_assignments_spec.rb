require 'swagger_helper'

RSpec.describe 'api/user_assignments', type: :request do
  path '/api/user_assignments' do
    get('list user_assignments') do
      parameter name: :userId, in: :query, type: :integer, description: 'User ID', required: true

      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: {
          type: :object,
          properties: {
            assignmentId: { type: :integer },
            title: { type: :string },
            status: { type: :string },
            score: { type: :integer, nullable: true },
            totalTimeSpent: { type: :integer, nullable: true, description: 'Total time spent in seconds' }
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
end
