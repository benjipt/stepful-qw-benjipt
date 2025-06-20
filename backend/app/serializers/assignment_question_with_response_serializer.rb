# TODO: Refactor this with AssignmentQuestionSerializer
class AssignmentQuestionWithResponseSerializer < ActiveModel::Serializer
  attributes :questionId, :content, :choices, :response

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

  def response
    user_assignment = scope
    uaq = UserAssignmentQuestion.find_by(user_assignment: user_assignment, assignment_question: object)
    uaq&.response
  end
end
