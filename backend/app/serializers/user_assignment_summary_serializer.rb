class UserAssignmentSummarySerializer < ActiveModel::Serializer
  attributes :assignmentId, :title, :status, :startedAt, :completedAt, :score

  def assignmentId
    object.assignment.id
  end

  def title
    object.assignment.title
  end

  def startedAt
    object.started_at
  end

  def completedAt
    object.completed_at
  end
end
