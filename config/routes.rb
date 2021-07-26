Rails.application.routes.draw do

    root "sessions#new"

    get '/login' => 'sessions#new'
    post '/login' => 'sessions#create'
    get '/logout' => 'sessions#destroy'

    get '/signup' => 'users#new'

    resources :users do 
        resources :organizations
    end
end
