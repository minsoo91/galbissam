Rails.application.routes.draw do
  root 'static_page#root'
  resources :users
end
