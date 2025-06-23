class UserAssignment < ApplicationRecord
  belongs_to :user
  belongs_to :assignment
  has_many :user_assignment_sessions, dependent: :destroy, inverse_of: :user_assignment
  has_many :user_assignment_questions, dependent: :destroy, inverse_of: :user_assignment

  STATUSES = {
    not_yet_started: 'not_yet_started',
    in_progress: 'in_progress',
    complete: 'complete'
  }.freeze

  validates :status, inclusion: { in: STATUSES.values }
  validates :score, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, allow_nil: true }
  validate :score_presence_and_range_for_complete
  validate :score_nil_unless_complete
  validate :total_time_spent_presence_for_complete

  # Class methods to access statuses
  def self.statuses
    STATUSES
  end

  # Instance methods for status checks
  def not_yet_started?
    status == STATUSES[:not_yet_started]
  end

  def in_progress?
    status == STATUSES[:in_progress]
  end

  def complete?
    status == STATUSES[:complete]
  end

  # Checks if all questions have a response, and if so, closes sessions, grades, and completes the assignment
  def complete_if_finished!
    total_questions = assignment.assignment_questions.count
    answered_questions = user_assignment_questions.where.not(response: [ nil, '' ]).count
    return unless total_questions > 0 && answered_questions == total_questions

    # Close any active sessions
    UserAssignmentSession.close_stale_sessions_for(self)

    # Grade: sum points for correct responses
    correct_question_ids = user_assignment_questions.where(correct: true).pluck(:assignment_question_id)
    total_points = AssignmentQuestion.where(id: correct_question_ids).sum(:points)
    self.score = total_points

    # Update total_time_spent
    self.total_time_spent = user_assignment_sessions.sum(:total_time)

    # Mark as complete
    self.status = self.class.statuses[:complete]
    save!
  end

  private

  def score_presence_and_range_for_complete
    if complete?
      if score.nil?
        errors.add(:score, 'must be present if status is complete')
      elsif !(0..100).include?(score)
        errors.add(:score, 'must be between 0 and 100')
      end
    end
  end

  def score_nil_unless_complete
    unless complete?
      errors.add(:score, 'must be nil unless status is complete') unless score.nil?
    end
  end

  def total_time_spent_presence_for_complete
    if complete? && total_time_spent.nil?
      errors.add(:total_time_spent, 'must be present if status is complete')
    end
  end
end
