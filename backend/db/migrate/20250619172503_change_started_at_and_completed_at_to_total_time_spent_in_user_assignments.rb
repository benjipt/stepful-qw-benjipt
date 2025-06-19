class ChangeStartedAtAndCompletedAtToTotalTimeSpentInUserAssignments < ActiveRecord::Migration[8.0]
  def change
    remove_column :user_assignments, :started_at, :datetime
    remove_column :user_assignments, :completed_at, :datetime
    add_column :user_assignments, :total_time_spent, :integer
  end
end
