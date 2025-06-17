class CreateUserAssignments < ActiveRecord::Migration[8.0]
  def change
    create_table :user_assignments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :assignment, null: false, foreign_key: true
      t.string :status
      t.datetime :started_at
      t.datetime :completed_at

      t.timestamps
    end
  end
end
