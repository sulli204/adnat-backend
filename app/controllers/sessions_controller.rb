class SessionsController < ApplicationController
    #Sessions used to persist session on rails end

    def new
    end

    # Invoked on login and signup

    def create
        @user = User.find_by(email: params[:email])
        if @user && @user.authenticate(params[:password])       #User exists
            session[:user_id] = @user.id
            render json: @user
        else                                                    # User doesn't exist
            render json: {}, status: 401
        end
    end

    # Invoked on logout

    def destroy
        session[:user_id] = nil
        render json: {}, status: 200
    end
end
