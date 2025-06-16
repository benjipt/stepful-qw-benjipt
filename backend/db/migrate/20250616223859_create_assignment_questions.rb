class CreateAssignmentQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :assignment_questions do |t|
      t.references :assignment, null: false, foreign_key: true
      t.string :question_content
      t.string :choices

      t.timestamps
    end
  end
end
