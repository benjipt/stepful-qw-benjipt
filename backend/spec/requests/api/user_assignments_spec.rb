require 'swagger_helper'

RSpec.describe 'api/user_assignments', type: :request do
  path '/api/user_assignments' do
    get('list user_assignments') do
      parameter name: :userEmail, in: :query, type: :string, description: 'User email', required: true

      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: {
          type: :object,
          properties: {
            assignmentId: { type: :integer },
            title: { type: :string },
            status: { type: :string },
            startedAt: { type: :string, format: :date_time, nullable: true },
            completedAt: { type: :string, format: :date_time, nullable: true },
            score: { type: :integer, nullable: true }
          },
          required: %w[assignmentId title status]
        }
        let(:userEmail) { users(:one).email }

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
