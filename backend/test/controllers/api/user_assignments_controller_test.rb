require 'test_helper'

class Api::UserAssignmentsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get api_user_assignments_url, params: { userEmail: users(:one).email }
    assert_response :success
  end
end
