class User < ApplicationRecord
  has_many :user_assignments, dependent: :destroy, inverse_of: :user
end
