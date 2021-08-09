class SessionsController < ApplicationController
    def new
    end

    def create
        @user = User.find_by(email: params[:email])
        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id
            if @user.organization_id.nil?
                render json: @user
            else
                # redirect_to user_organization_path(user.id, user.organization_id)
                render json: @user
            end
        else

            render json: {}, status: 401
        end
    end

    def destroy
        session[:user_id] = nil
        redirect_to '/login'
    end
end
