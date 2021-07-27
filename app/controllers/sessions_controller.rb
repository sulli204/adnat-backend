class SessionsController < ApplicationController
    def new
    end

    def create
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            if user.organization_id.nil?
                redirect_to user_organizations_path(user.id)
            else
                redirect_to user_organization_path(user.id, user.organization_id)
            end
        else
            redirect_to '/login'
        end
    end

    def destroy
        session[:user_id] = nil
        redirect_to '/login'
    end
end
