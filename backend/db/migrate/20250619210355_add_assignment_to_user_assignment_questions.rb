class AddAssignmentToUserAssignmentQuestions < ActiveRecord::Migration[8.0]
  def change
    add_reference :user_assignment_questions, :assignment, foreign_key: true
  end
end
