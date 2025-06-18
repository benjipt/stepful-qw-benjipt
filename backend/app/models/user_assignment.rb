class UserAssignment < ApplicationRecord
  belongs_to :user
  belongs_to :assignment

  STATUSES = {
    not_yet_started: 'not_yet_started',
    in_progress: 'in_progress',
    complete: 'complete'
  }.freeze

  validates :status, inclusion: { in: STATUSES.values }
  validates :score, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100, allow_nil: true }
  validate :score_presence_and_range_for_complete
  validate :score_nil_unless_complete

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
end
