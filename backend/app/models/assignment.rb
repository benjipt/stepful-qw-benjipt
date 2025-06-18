class Assignment < ApplicationRecord
  has_many :assignment_questions, dependent: :destroy, inverse_of: :assignment
  has_many :user_assignments, dependent: :destroy, inverse_of: :assignment
  has_many :users, through: :user_assignments

  validate :total_points_must_be_100

  private

  def total_points_must_be_100
    return if assignment_questions.empty?
    if assignment_questions.sum(:points) != 100
      errors.add(:base, 'Total points for all questions must equal 100')
    end
  end
end
