class ShiftsController < ApplicationController
    def new
        @shift = Shift.new
    end

    def index
        @shifts = Shift.joins(:user).where(organization_id: params[:organization_id]).order('start DESC')
        @shifts = @shifts.where("departed = false")
        @organization = Organization.find(params[:organization_id])
        if @shifts
            @beautified_shifts = helpers.beautify_shifts(@shifts, @organization.hourly)           
        end
        render json: @beautified_shifts
    end

    def show
        
    end

    def get_departed
        @shifts = Shift.joins(:user).where(organization_id: params[:organization_id]).order('start DESC')
        @shifts = @shifts.where("departed = true")
        @organization = Organization.find(params[:organization_id])
        if @shifts
            @beautified_shifts = helpers.beautify_shifts(@shifts, @organization.hourly)
        end
        render json: @beautified_shifts
    end

    def create
        @shift = Shift.new(shift_params)

        start_time = DateTime.strptime(params[:shift][:start], ' %Y-%m-%d %H:%M')
        finish_time = DateTime.strptime(params[:shift][:finish], '%Y-%m-%d %H:%M')
        
        @organization = Organization.find(params[:organization_id])
        @shift.start = start_time
        @shift.finish = finish_time
        @shift.organization_id = params[:organization_id]

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
