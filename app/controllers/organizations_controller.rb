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

        if @organization.update(org_params)
            puts current_user
            if current_user.organization_id == nil
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
        organization = Organization.new(org_params)
        if organization.save
            redirect_post(join_path(org_id: organization.id), options: {authenticity_token: :auto})
        else
            render :new
        end
    end

    private
    def org_params
        params.require(:organization).permit(:name, :hourly)
    end
end
