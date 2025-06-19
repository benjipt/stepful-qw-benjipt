class CreateUserAssignmentSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :user_assignment_sessions do |t|
      t.references :user_assignment, null: false, foreign_key: true
      t.datetime :session_start
      t.datetime :session_end
      t.integer :total_time

      t.timestamps
    end
  end
end
