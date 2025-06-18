require 'swagger_helper'

RSpec.describe 'api/user_assignments', type: :request do
  path '/api/user_assignments' do
    get('list user_assignments') do
      parameter name: :userEmail, in: :query, type: :string, description: 'User email', required: true

      response(200, 'successful') do
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
