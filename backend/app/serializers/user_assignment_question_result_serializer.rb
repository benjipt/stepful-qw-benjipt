class UserAssignmentQuestionResultSerializer < ActiveModel::Serializer
  attributes :id, :content, :response, :correct, :points, :gradeExplanation

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

  def points
    object.assignment_question.points
  end

  def gradeExplanation
    object.grade_explanation
  end
end
