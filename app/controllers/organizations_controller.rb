class OrganizationsController < ApplicationController
    def new
    end
    
    def index
        @organizations = Organization.all
    end

    def edit
        @organization = Organization.find(params[:id])
    end

    def update
        @organization = Organization.find(params[:id])

        if @organization.update(org_params)
            redirect_to user_organizations_path
        else 
            render :edit
        end
    end

    def create
        organization = Organization.new(org_params)
        if organization.save
            
        else
            render :new
        end
    end

    private
    def org_params
        params.require(:organization).permit(:name, :hourly)
    end
end
