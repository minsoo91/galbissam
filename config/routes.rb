Rails.application.routes.draw do
  root 'static_page#root'
  get '/landing' => 'static_page#splash'
  resources :users
  resource :session, only: [:create, :new, :destroy]
  namespace :api, defaults: { format: :json } do
  	resources :photos, only: [:index, :show, :create, :new]
  	resources :restaurants
  	resources :menuitems
  	resources :likes
  end
end
