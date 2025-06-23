class UserAssignmentSummarySerializer < ActiveModel::Serializer
  attributes :userAssignmentId, :title, :status, :score, :totalTimeSpent, :possibleScore
  attribute :results, if: :complete?

  delegate :complete?, to: :object

  def userAssignmentId
    object.id
  end

  def title
    object.assignment.title
  end

  def totalTimeSpent
    object.total_time_spent
  end

  def possibleScore
    # Sum of all points for each AssignmentQuestion belonging to this assignment
    object.assignment.assignment_questions.sum(:points)
  end

  def results
    # Only the most recent UserAssignmentQuestion per assignment_question_id
    questions = object.user_assignment_questions.includes(:assignment_question)
    latest_questions = questions
      .sort_by { |q| [ q.assignment_question_id, -q.created_at.to_i ] }
      .group_by(&:assignment_question_id)
      .map { |_, records| records.first }
    {
      totalQuestions: latest_questions.size,
      totalCorrect: latest_questions.select { |q| q.correct }.size,
      questions: ActiveModelSerializers::SerializableResource.new(
        latest_questions,
        each_serializer: UserAssignmentQuestionResultSerializer
      )
    }
  end
end
