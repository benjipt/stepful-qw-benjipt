class AssignmentQuestionSerializer < ActiveModel::Serializer
  attributes :questionId, :content, :choices, :points

  def questionId
    object.id
  end

  def content
    object.question_content
  end

  def choices
    return nil if object.choices.nil?
    object.choices.split(';;')
  end

  def points
    object.points
  end
end
