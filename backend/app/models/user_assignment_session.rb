class UserAssignmentSession < ApplicationRecord
  belongs_to :user_assignment

  validates :session_start, presence: true
  # session_end and total_time can be nil
end
