Rails.application.routes.draw do
  root 'static_page#root'
  resources :users
  resource :session, only: [:create, :new, :destroy]
end
