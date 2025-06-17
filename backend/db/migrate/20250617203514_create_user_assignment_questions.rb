class CreateUserAssignmentQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :user_assignment_questions do |t|
      t.references :user_assignment, null: false, foreign_key: true
      t.references :assignment_question, null: false, foreign_key: true
      t.text :response
      t.boolean :correct

      t.timestamps
    end
  end
end
