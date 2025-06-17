class AddCorrectChoiceToAssignmentQuestions < ActiveRecord::Migration[8.0]
  def change
    add_column :assignment_questions, :correct_choice, :string
  end
end
