module Api
  class HelloWorldController < ApplicationController
    def index
      render json: { message: "Hello, world!" }
    end
  end
end
