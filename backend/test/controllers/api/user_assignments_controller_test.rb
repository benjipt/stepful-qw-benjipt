require 'test_helper'

class Api::UserAssignmentsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get api_user_assignments_url, params: { userId: users(:one).id }
    assert_response :success
  end

  test 'should return only the most recent user_assignment per assignment_id' do
    # There are multiple user_assignments for user :one and assignment :one
    get api_user_assignments_url, params: { userId: users(:one).id }
    assert_response :success
    json = JSON.parse(@response.body)
    # Find the record with the latest created_at for assignment_id = assignments(:one).id
    most_recent = UserAssignment.where(user: users(:one), assignment: assignments(:one)).order(created_at: :desc).first
    # The response should include only one record for assignment_id = assignments(:one).id
    assignment_ids = json.map { |ua| ua['assignmentId'] }
    assert_equal assignment_ids.uniq.length, assignment_ids.length, 'Should not have duplicate assignmentIds'
    # The returned record for assignment_id should have the most recent status/score
    record = json.find { |ua| ua['assignmentId'] == assignments(:one).id }
    assert_equal most_recent.status, record['status']
    if most_recent.score.nil?
      assert_nil record['score']
    else
      assert_equal most_recent.score, record['score']
    end
  end
end
