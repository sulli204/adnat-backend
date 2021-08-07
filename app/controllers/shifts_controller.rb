class ShiftsController < ApplicationController
    def new
        @shift = Shift.new
    end

    def index
        @shifts = Shift.joins(:user).where(user: {organization_id: params[:organization_id]}).order('start DESC')
        @organization = Organization.find(params[:organization_id])
        @beautified_shifts = Array.new
        if @shifts
            i = 0
            for shift in @shifts
                @beautified_shifts[i] = {
                                        "name" => User.find(shift.user_id).name, 
                                        "date" => shift.start.to_date,
                                        "start" => shift.start.to_time.strftime("%I:%M%p").to_s,
                                        "finish" => shift.finish.to_time.strftime("%I:%M%p").to_s,
                                        "break" => shift.break,
                                        "hours" => ((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600),
                                        "shift_cost" => (((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600) * @organization.hourly)
                                        }
                i = i + 1
            end            
        end
        render json: @beautified_shifts
    end

    def show
        
    end

    def create
        @shift = Shift.new(shift_params)


        start_time = DateTime.strptime(params[:shift][:start], ' %Y-%m-%d %H:%M')
        finish_time = DateTime.strptime(params[:shift][:finish], '%Y-%m-%d %H:%M')
        
        @organization = Organization.find(params[:organization_id])
        @shift.start = start_time
        @shift.finish = finish_time

        if @shift.save
            @beautified_shift = {
                                        "name" => User.find(@shift.user_id).name, 
                                        "date" => @shift.start.to_date,
                                        "start" => @shift.start.to_time.strftime("%I:%M%p").to_s,
                                        "finish" => @shift.finish.to_time.strftime("%I:%M%p").to_s,
                                        "break" => @shift.break,
                                        "hours" => ((@shift.finish.to_time - @shift.start.to_time - (@shift.break * 60.0)) / 3600),
                                        "shift_cost" => (((@shift.finish.to_time - @shift.start.to_time - (@shift.break * 60.0)) / 3600) * @organization.hourly)
                                        }
            render json: @beautified_shift
        else
            puts "Shift did not save"
        end
    end
    private
    def shift_params
        params.require(:shift).permit(:start, :finish, :break, :user_id)
    end
end
