class OrganizationsController < ApplicationController
    def new
        @organization = Organization.new
    end
    
    def index
        @organizations = Organization.all
        render json: @organizations
    end

    def show
        @organization = Organization.find(params[:id])
        render json: @organization
    end

    def edit
        @organization = Organization.find(params[:id])
    end

    def update
        @organization = Organization.find(params[:id])
        @user = User.find(params[:user_id])
        if @organization.update(org_params)
            if @user.organization_id == nil
                @organizations = Organization.all
                render json: @organizations
            else
                render json: @organization
            end
        else 
            render :edit
        end
    end

    def create
        begin
            @organization = Organization.new(org_params)
            if @organization.save!
                render json: @organization
            end
        rescue ActiveRecord::RecordInvalid
            render json: {e_messages: @organization.errors.full_messages}, status: 422
        end
    end

    private
    def org_params
        params.require(:organization).permit(:name, :hourly)
    end
end
