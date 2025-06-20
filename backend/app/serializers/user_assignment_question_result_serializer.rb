class UserAssignmentQuestionResultSerializer < ActiveModel::Serializer
  attributes :id, :content, :response, :correct

  def id
    object.id
  end

  def content
    object.assignment_question.question_content
  end

  def response
    object.response
  end

  def correct
    object.correct
  end
end
