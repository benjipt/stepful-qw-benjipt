class UserAssignment < ApplicationRecord
  belongs_to :user
  belongs_to :assignment

  STATUSES = {
    not_yet_started: 'not_yet_started',
    in_progress: 'in_progress',
    complete: 'complete'
  }.freeze

  validates :status, inclusion: { in: STATUSES.values }

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
end
