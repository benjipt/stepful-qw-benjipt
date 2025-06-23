class UserAssignmentSession < ApplicationRecord
  belongs_to :user_assignment

  validates :session_start, presence: true
  # session_end and total_time can be nil

  MAX_SESSION_DURATION = 2.hours

  after_create :populate_user_assignment_questions_if_first_session

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

  private

  def populate_user_assignment_questions_if_first_session
    if user_assignment.user_assignment_questions.empty?
      assignment_questions = user_assignment.assignment.assignment_questions
      assignment_questions.find_each do |assignment_question|
        user_assignment.user_assignment_questions.create!(assignment_id: user_assignment.assignment_id, assignment_question_id: assignment_question.id)
      end
    end
  end
end
