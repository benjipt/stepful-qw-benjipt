require 'swagger_helper'

RSpec.describe 'api/user_assignment_sessions', type: :request do
  path '/api/user_assignment_sessions' do
    post('create user_assignment_session') do
      tags 'UserAssignmentSessions'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :userAssignmentId, in: :body, schema: {
        type: :object,
        properties: {
          userAssignmentId: { type: :integer }
        },
        required: [ 'userAssignmentId' ]
      }

      response(201, 'created') do
        schema type: :object, properties: {
          success: { type: :boolean },
          userAssignmentSessionId: { type: :integer }
        }, required: %w[success userAssignmentSessionId]

        let(:user_assignment) { FactoryBot.create(:user_assignment) }
        let(:userAssignmentId) { user_assignment.id }
        let(:raw_post) { { userAssignmentId: userAssignmentId }.to_json }

        run_test!
      end

      response(404, 'not found') do
        let(:userAssignmentId) { -1 }
        let(:raw_post) { { userAssignmentId: userAssignmentId }.to_json }
        run_test!
      end

      response(422, 'unprocessable entity') do
        let(:userAssignmentId) { nil }
        let(:raw_post) { { userAssignmentId: userAssignmentId }.to_json }
        run_test!
      end
    end
  end

  path '/api/user_assignment_sessions/{id}' do
    patch('update user_assignment_session') do
      tags 'UserAssignmentSessions'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, description: 'UserAssignmentSession ID', required: true

      response(200, 'success') do
        schema type: :object, properties: {
          success: { type: :boolean }
        }, required: [ 'success' ]

        let(:user_assignment) { FactoryBot.create(:user_assignment) }
        let(:user_assignment_session_record) { FactoryBot.create(:user_assignment_session, user_assignment: user_assignment, session_start: Time.current) }
        let(:id) { user_assignment_session_record.id }

        run_test!
      end

      response(404, 'not found') do
        let(:id) { -1 }
        run_test!
      end

      response(422, 'unprocessable entity') do
        let(:user_assignment) { FactoryBot.create(:user_assignment) }
        let(:user_assignment_session_record) { FactoryBot.create(:user_assignment_session, user_assignment: user_assignment, session_start: Time.current, session_end: Time.current) }
        let(:id) { user_assignment_session_record.id }
        run_test!
      end
    end
  end
end
