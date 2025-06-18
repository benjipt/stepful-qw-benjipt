require 'test_helper'

class UserAssignmentTest < ActiveSupport::TestCase
  test 'score can be nil if status is not complete' do
    ua = UserAssignment.new(user: users(:one), assignment: assignments(:one), status: UserAssignment.statuses[:in_progress], score: nil)
    assert ua.valid?
  end

  test 'score must be present if status is complete' do
    ua = UserAssignment.new(user: users(:one), assignment: assignments(:one), status: UserAssignment.statuses[:complete], score: nil)
    assert_not ua.valid?
    assert_includes ua.errors[:score], 'must be present if status is complete'
  end

  test 'score must be between 0 and 100 if present and status is complete' do
    ua = UserAssignment.new(user: users(:one), assignment: assignments(:one), status: UserAssignment.statuses[:complete], score: 101)
    assert_not ua.valid?
    assert_includes ua.errors[:score], 'must be between 0 and 100'

    ua.score = -1
    assert_not ua.valid?
    assert_includes ua.errors[:score], 'must be between 0 and 100'

    ua.score = 50
    assert ua.valid?
  end

  test 'score of 0 is valid if status is complete' do
    ua = UserAssignment.new(user: users(:one), assignment: assignments(:one), status: UserAssignment.statuses[:complete], score: 0)
    assert ua.valid?
  end

  test 'score of 100 is valid if status is complete' do
    ua = UserAssignment.new(user: users(:one), assignment: assignments(:one), status: UserAssignment.statuses[:complete], score: 100)
    assert ua.valid?
  end

  test 'score must be nil if status is not complete' do
    ua = UserAssignment.new(user: users(:one), assignment: assignments(:one), status: UserAssignment.statuses[:in_progress], score: 10)
    assert_not ua.valid?
    assert_includes ua.errors[:score], 'must be nil unless status is complete'

    ua.score = 0
    assert_not ua.valid?
    assert_includes ua.errors[:score], 'must be nil unless status is complete'

    ua.score = nil
    assert ua.valid?
  end
end
