Rails.application.routes.draw do
  root 'sessions#new'
  resources :users
  resource :session, only: [:create, :new, :destroy]
  namespace :api, defaults: { format: :json } do
  	resources :photos, only: [:index, :show, :create, :new]
  end
end
