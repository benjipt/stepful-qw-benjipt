Rails.application.routes.draw do
  mount Rswag::Api::Engine => '/api-docs'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  namespace :api do
    resources :users, only: [ :index ]
    resources :user_assignments, only: [ :index, :show ] do
      resources :questions, only: [ :index ], controller: 'user_assignment_questions'
    end
  end
end
