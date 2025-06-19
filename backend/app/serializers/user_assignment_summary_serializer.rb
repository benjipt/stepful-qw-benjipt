class UserAssignmentSummarySerializer < ActiveModel::Serializer
  attributes :assignmentId, :title, :status, :score, :totalTimeSpent

  def assignmentId
    object.assignment.id
  end

  def title
    object.assignment.title
  end

  def totalTimeSpent
    object.total_time_spent
  end
end
