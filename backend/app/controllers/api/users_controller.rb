class Api::UsersController < ApplicationController
  # GET /api/users
  # Returns a list of all users
  def index
    users = User.all
    render json: users, status: :ok
  end
end
