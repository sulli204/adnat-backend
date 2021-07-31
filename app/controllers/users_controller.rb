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
            redirect_to user_organizations_path(@user.id)
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
            puts @user.inspect
        end
    end

    def join
        @user = User.find(params[:user_id])
        @organization = Organization.find(params[:org_id])
        
        if @user.update_attribute(:organization_id, @organization.id)
            redirect_to user_organization_path(@user, @organization)
        end
    end

    def leave
        @user = User.find(params[:user_id])
        if @user.update_attribute(:organization_id, nil)
            @shifts = Shift.where(user_id: @user.id)
            puts @shifts.inspect
            for shift in @shifts
                shift.destroy
            end
            redirect_to user_organizations_path
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
                        redirect_to '/login', notice: "Password Successfully Changed!"
                    end
                end
            end
        rescue ActiveRecord::RecordNotFound
            flash[:notice] = "No user with that email exists."
            redirect_to '/forgot_password'
        end

    end

    def forgot_password
    end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password_digest, :organization_id)
    end
end
