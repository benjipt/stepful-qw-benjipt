class User < ApplicationRecord
  has_many :user_assignments, dependent: :destroy, inverse_of: :user
  has_many :assignments, through: :user_assignments
end
