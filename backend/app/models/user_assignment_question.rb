class UserAssignmentQuestion < ApplicationRecord
  belongs_to :user_assignment
  belongs_to :assignment_question

  validates :response, presence: true
  validates :assignment_question_id, uniqueness: { scope: :user_assignment_id }
end
