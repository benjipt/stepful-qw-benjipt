class UserAssignmentQuestion < ApplicationRecord
  belongs_to :user_assignment
  belongs_to :assignment
  belongs_to :assignment_question

  validates :assignment_id, presence: true
  validates :response, presence: true
  validates :assignment_question_id, uniqueness: { scope: :user_assignment_id }
end
