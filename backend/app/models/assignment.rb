class Assignment < ApplicationRecord
  has_many :assignment_questions, dependent: :destroy, inverse_of: :assignment
  has_many :user_assignments, dependent: :destroy, inverse_of: :assignment
end
