class AddPointsToAssignmentQuestions < ActiveRecord::Migration[8.0]
  def change
    add_column :assignment_questions, :points, :integer
  end
end
