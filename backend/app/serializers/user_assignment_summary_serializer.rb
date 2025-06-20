class UserAssignmentSummarySerializer < ActiveModel::Serializer
  attributes :userAssignmentId, :title, :status, :score, :totalTimeSpent
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

  def results
    questions = object.user_assignment_questions.includes(:assignment_question)
    {
      totalQuestions: questions.size,
      totalCorrect: questions.select { |q| q.correct }.size,
      questions: ActiveModelSerializers::SerializableResource.new(
        questions,
        each_serializer: UserAssignmentQuestionResultSerializer
      )
    }
  end
end
