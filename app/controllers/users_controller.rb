class UsersController < ApplicationController
    def new
    end

    def create
        user = User.new(name: params[:name],
                        email: params[:email],
                        password: params[:password],
                        password_confirmation: params[:password_confirmation],
                        organization_id: 0
        )
        if user.save
            session[:user_id] = user.id
            redirect_to user_organizations_path(user.id)
        else
            redirect_to '/signup'
        end
    end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password_digest, :organization_id)
    end
end
