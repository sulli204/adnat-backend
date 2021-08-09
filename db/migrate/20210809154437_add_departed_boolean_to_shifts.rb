class AddDepartedBooleanToShifts < ActiveRecord::Migration[6.1]
  def change
    add_column :shifts, :departed, :boolean, :default => false
  end
end
