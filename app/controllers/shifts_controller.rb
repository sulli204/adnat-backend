class ShiftsController < ApplicationController
    def new
        @shift = Shift.new
    end

    def index
        @shifts = Shift.joins(:user).where(user: {organization_id: params[:organization_id]})
        @organization = Organization.find(params[:organization_id])
        @beautified_shifts = Array.new
        i = 0
        for shift in @shifts
            @beautified_shifts[i] = {
                                     "name" => User.find(shift.user_id).name, 
                                     "date" => shift.start.to_date,
                                     "start" => shift.start.to_time.to_s(:time),
                                     "finish" => shift.finish.to_time.to_s(:time),
                                     "break" => shift.break,
                                     "hours" => ((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600).to_s,
                                     "shift_cost" => (((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600) * @organization.hourly).to_s
                                    }
            i = i + 1
        end
        puts @beautified_shifts
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
