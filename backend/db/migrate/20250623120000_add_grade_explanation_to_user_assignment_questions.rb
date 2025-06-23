class AddGradeExplanationToUserAssignmentQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :user_assignment_questions, :grade_explanation, :text, null: true
  end
end
