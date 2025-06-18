require 'swagger_helper'

RSpec.describe 'api/users', type: :request do
  path '/api/users' do
    get('list users') do
      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: {
          type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            email: { type: :string }
          },
          required: %w[id name email]
        }

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
