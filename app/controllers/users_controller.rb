class UsersController < ApplicationController
    def new
    end

    def create
        @user = User.new(name: params[:name],
                        email: params[:email],
                        password: params[:password],
                        password_confirmation: params[:password_confirmation],
                        organization_id: nil
        )

        if @user.save
            session[:user_id] = @user.id
            render json: @user
        else
            puts @user.inspect
            redirect_to '/signup'
        end
    end

    def edit
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            render json: @user
        end
    end

    def join
        @user = User.find(params[:user_id])
        @organization = Organization.find(params[:org_id])
        
        if @user.update_attribute(:organization_id, @organization.id)
            @shifts = Shift.where(user_id: @user.id)
            @shifts.update_all(departed: false)
            render json: @user
        end
    end

    def leave
        @user = User.find(params[:user_id])
        if @user.update_attribute(:organization_id, nil)
            @shifts = Shift.where(user_id: @user.id)

            @shifts.update_all(departed: true)
        end
    end
    
    def change_password
        begin
            @user = User.find_by(email: params[:email])
            if @user == nil
                raise ActiveRecord::RecordNotFound
            else
                if params[:password] == params[:password_confirmation]
                    digest = BCrypt::Password.create(params[:password])
                    if @user.update_attribute(:password_digest, digest)
                        render json: @user
                    end
                end
            end
        rescue ActiveRecord::RecordNotFound
            flash[:notice] = "No user with that email exists."
            render json: {status: 404}
        end

    end

    def forgot_password
    end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password_digest, :organization_id)
    end
end
