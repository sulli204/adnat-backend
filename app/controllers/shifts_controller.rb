class ShiftsController < ApplicationController
    # Shifts controller
    # Holds all methods pertaining to creating, destroying,
    # maintaining, updating, and showing shift attributes

    def new
        @shift = Shift.new
    end

    # Shows a single organization's current employees' shifts

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

    # Shows a single organization's former employees' shifts

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
        begin
            if (params[:shift][:start] == " ") #How a blank date is passed from the frontend
                raise ActiveRecord::RecordInvalid
            end
            
            start_time = DateTime.strptime(params[:shift][:start], ' %Y-%m-%d %H:%M')
            finish_time = DateTime.strptime(params[:shift][:finish], '%Y-%m-%d %H:%M')
            
            @organization = Organization.find(params[:organization_id])
            
            if (finish_time - start_time < 0)  # Overnight shift case 
                finish_time = finish_time + 1  # Increase finish_time's date by a day
            end

            @shift.start = start_time
            @shift.finish = finish_time
            @shift.organization_id = params[:organization_id]

            if @shift.save!
                @beautified_shift = helpers.beautify_shifts([@shift], @organization.hourly)
                render json: @beautified_shift
            end

        rescue ActiveRecord::RecordInvalid
            render json: {e_messages: @shift.errors.full_messages}, status: 422
        end
    end

    def update
        @shift = Shift.find(params[:id])
        if @shift.update(shift_params)
            render json: @shift
        end
    end

    private
    def shift_params
        params.require(:shift).permit(:start, :finish, :break, :user_id)
    end
end
