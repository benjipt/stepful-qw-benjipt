require "test_helper"

class AssignmentTest < ActiveSupport::TestCase
  test "is valid when total points equal 100" do
    assignment = Assignment.create!(title: "Test Assignment")
    assignment.assignment_questions.create!(question_content: "Q1", points: 60)
    assignment.assignment_questions.create!(question_content: "Q2", points: 40)
    assignment.reload
    assert assignment.valid?
  end

  test "is invalid when total points do not equal 100" do
    assignment = Assignment.new(title: "Test Assignment")
    assignment.assignment_questions.build(question_content: "Q1", points: 60)
    assignment.assignment_questions.build(question_content: "Q2", points: 30)
    assert_not assignment.save
    assert_includes assignment.errors[:base], "Total points for all questions must equal 100"
  end
end
