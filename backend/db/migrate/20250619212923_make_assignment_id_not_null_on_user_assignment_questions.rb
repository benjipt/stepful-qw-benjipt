class MakeAssignmentIdNotNullOnUserAssignmentQuestions < ActiveRecord::Migration[8.0]
  def change
    change_column_null :user_assignment_questions, :assignment_id, false
  end
end
