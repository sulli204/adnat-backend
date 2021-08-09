Rails.application.routes.draw do

    root "sessions#new"

    get '/login' => 'sessions#new'
    post '/login' => 'sessions#create'
    get '/logout' => 'sessions#destroy'

    get '/forgot_password' => 'users#forgot_password'
    patch '/forgot_password' => 'users#change_password'

    get '/signup' => 'users#new'

    post '/join/:user_id/:org_id' => 'users#join', as: 'join'
    post '/leave/:user_id' => 'users#leave', as: 'leave'

    get '/users/:user_id/organizations/:organization_id/departed_shifts' => "shifts#get_departed"

    resources :users do 
        resources :organizations do
            resources :shifts
        end
    end
end
