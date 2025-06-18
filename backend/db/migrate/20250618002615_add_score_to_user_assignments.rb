class AddScoreToUserAssignments < ActiveRecord::Migration[8.0]
  def change
    add_column :user_assignments, :score, :integer
  end
end
