Rails.application.routes.draw do

    root "sessions#new"

    get '/login' => 'sessions#new'
    post '/login' => 'sessions#create'
    get '/logout' => 'sessions#destroy'

    get '/signup' => 'users#new'

    post '/join/:user_id/:org_id' => 'users#join', as: 'join'
    post '/leave/:user_id' => 'users#leave', as: 'leave'

    resources :users do 
        resources :organizations
    end
end
