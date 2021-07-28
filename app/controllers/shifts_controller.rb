class ShiftsController < ApplicationController
    def new
        @shift = Shift.new
    end

    def index
        @shifts = Shift.joins(:user).where(user: {organization_id: params[:organization_id]})
        puts @shifts.inspect
    end

    def show
        
    end

    def create
        @shift = Shift.new(shift_params)
        if @shift.save
        else
            render :new
        end
    end
    private
    def shift_params
        params.require(:shift).permit(:start, :finish, :break, :user_id)
    end
end
