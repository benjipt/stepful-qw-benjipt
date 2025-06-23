class UserAssignmentSession < ApplicationRecord
  belongs_to :user_assignment

  validates :session_start, presence: true
  # session_end and total_time can be nil

  MAX_SESSION_DURATION = 2.hours

  def active?
    session_start.present? && session_end.nil?
  end

  # Returns the effective end time (actual or capped)
  def effective_session_end
    session_end || [ session_start + MAX_SESSION_DURATION, Time.current ].min
  end

  # Returns the effective total time in seconds
  def effective_total_time
    [ (effective_session_end - session_start).to_i, MAX_SESSION_DURATION.to_i ].min
  end

  # Closes all open sessions for a given user_assignment
  def self.close_stale_sessions_for(user_assignment)
    user_assignment.user_assignment_sessions.where(session_end: nil).find_each do |session|
      effective_end = [ session.session_start + MAX_SESSION_DURATION, Time.current ].min
      session.session_end = effective_end
      session.total_time = (session.session_end - session.session_start).to_i
      session.save!
    end
  end
end
