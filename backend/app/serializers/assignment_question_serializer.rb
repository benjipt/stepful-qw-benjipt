class AssignmentQuestionSerializer < ActiveModel::Serializer
  # Expects `scope` to be a hash with :user_assignment and :responses (assignment_question_id => response)
  attributes :questionId, :content, :choices, :points, :response

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

  def response
    responses = scope[:responses]
    return nil unless responses
    responses[object.id]
  end
end
