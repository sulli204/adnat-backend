module ShiftsHelper

    # Returns array of shifts in a clean format for index shifts case
    # Returns empty array for no existing shifts

    def beautify_shifts (shifts, hourly)
        if (shifts.length() > 0)
            @beautified_shifts = Array.new
            i = 0
            for shift in shifts
                @beautified_shifts[i] = {
                    "name" => User.find(shift.user_id).name, 
                    "date" => shift.start.to_date,
                    "start" => shift.start.to_time.strftime("%I:%M%p").to_s,
                    "finish" => shift.finish.to_time.strftime("%I:%M%p").to_s,
                    "break" => shift.break,
                    "hours" => number_with_precision(((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600), precision: 1),
                    "shift_cost" => number_to_currency((((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600) * hourly))
                }
                i = i + 1
            end
            return @beautified_shifts
        else
            @beautified_shifts = Array.new
            return @beautified_shifts
        end
    end

end
