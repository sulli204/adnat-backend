class ShiftsController < ApplicationController
    def new
        @shift = Shift.new
    end

    def index
        @shifts = Shift.joins(:user).where(user: {organization_id: params[:organization_id]}).order('start DESC')
        @organization = Organization.find(params[:organization_id])
        @beautified_shifts = Array.new
        # puts @shifts.inspect
        if @shifts
            i = 0
            for shift in @shifts
                @beautified_shifts[i] = {
                                        "name" => User.find(shift.user_id).name, 
                                        "date" => shift.start.to_date,
                                        "start" => shift.start.to_time.strftime("%I:%M%p").to_s,
                                        "finish" => shift.finish.to_time.strftime("%I:%M%p").to_s,
                                        "break" => shift.break,
                                        "hours" => ((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600).to_s,
                                        "shift_cost" => (((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600) * @organization.hourly).to_s
                                        }
                i = i + 1
            end
        end
    end

    def show
        
    end

    def create
        @shift = Shift.new(shift_params)

        @shift_date = Date.strptime(params[:shift][:date], '%Y-%m-%d')
        @start_time = Time.strptime(params[:shift][:start], '%H:%M')
        @finish_time = Time.strptime(params[:shift][:finish], '%H:%M')
 
        @shift.start = DateTime.new(@shift_date.year, @shift_date.month, @shift_date.day, @start_time.hour, @start_time.min, @start_time.sec, @start_time.zone)
        @shift.finish = DateTime.new(@shift_date.year, @shift_date.month, @shift_date.day, @finish_time.hour, @finish_time.min, @finish_time.sec, @finish_time.zone)

        if @shift.save
            redirect_to user_organization_shifts_path
        else
            render :new
        end
    end
    private
    def shift_params
        params.require(:shift).permit(:start, :finish, :break, :user_id)
    end
end
