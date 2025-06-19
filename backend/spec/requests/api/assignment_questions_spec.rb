require 'rails_helper'
require 'swagger_helper'

RSpec.describe 'Assignment Questions API', type: :request do
  path '/api/assignments/{assignmentId}/questions' do
    get 'Returns all assignment questions for a given assignment' do
      tags 'AssignmentQuestions'
      produces 'application/json'
      parameter name: :assignmentId, in: :path, type: :string, description: 'Assignment ID (camelCase)'

      response '200', 'questions found' do
        schema type: :array, items: {
          type: :object,
          properties: {
            questionId: { type: :integer },
            content: { type: :string },
            choices: { type: :array, items: { type: :string }, nullable: true }
          },
          required: [ 'questionId', 'content', 'choices' ]
        }

        let(:assignment) { Assignment.create!(title: 'Test Assignment') }
        let!(:question1) { AssignmentQuestion.create!(assignment: assignment, question_content: 'Q1', choices: 'A;;B;;C') }
        let!(:question2) { AssignmentQuestion.create!(assignment: assignment, question_content: 'Q2', choices: nil) }
        let(:assignmentId) { assignment.id }

        run_test!
      end

      response '404', 'assignment not found' do
        let(:assignmentId) { 'invalid' }
        run_test!
      end
    end
  end
end
