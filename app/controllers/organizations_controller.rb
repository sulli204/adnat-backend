class OrganizationsController < ApplicationController
    def new
    end
    
    def index
        @organizations = Organization.all
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
