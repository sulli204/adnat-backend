module ShiftsHelper
    def beautify_shifts (shifts, hourly)
        @beautified_shifts = Array.new
        i = 0
        for shift in shifts
            @beautified_shifts[i] = {
                                    "name" => User.find(shift.user_id).name, 
                                    "date" => shift.start.to_date,
                                    "start" => shift.start.to_time.strftime("%I:%M%p").to_s,
                                    "finish" => shift.finish.to_time.strftime("%I:%M%p").to_s,
                                    "break" => shift.break,
                                    "hours" => ((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600),
                                    "shift_cost" => (((shift.finish.to_time - shift.start.to_time - (shift.break * 60.0)) / 3600) * hourly)
                                    }
            i = i + 1
        end
        return @beautified_shifts
    end

end
