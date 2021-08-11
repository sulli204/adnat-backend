# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Organization.create(name: "Bob's Burgers", hourly: 15.00)
Organization.create(name: "The Big Donut", hourly: 12.50)
Organization.create(name: "Red Seven", hourly: 17.75)
Organization.create(name: "Von's Records", hourly: 11.25)

User.create(name: "Nate Stern", email: "stern97@gmail.com", password: "nathanrules", password_confirmation: "nathanrules", organization_id: 1)
User.create(name: "Finn the Human", email: "finn11@gmail.com", password: "jakethedog", password_confirmation: "jakethedog", organization_id: 1)
User.create(name: "Elenor Zheng", email: "ezheng31@yahoo.com", password: "chromewaves", password_confirmation: "chromewaves", organization_id: 2)
User.create(name: "Sophie Day", email: "brightdayS@gmail.com", password: "summerrules", password_confirmation: "summerrules", organization_id: 2)
User.create(name: "Andre Stephens", email: "dresteph@hotmail.com", password: "frootyloops", password_confirmation: "frootyloops", organization_id: 3)
User.create(name: "Walter White", email: "blueforyou@greymatter.com", password: "rvlife", password_confirmation: "rvlife", organization_id: 3)
User.create(name: "Tom Nook", email: "tom@nookscranny.com", password: "iamgreedy", password_confirmation: "iamgreedy", organization_id: 4)
User.create(name: "Peter Robinson", email: "peter@nature.com", password: "newalbum", password_confirmation: "newalbum", organization_id: 4)

#Nate Shifts
Shift.create(start: DateTime.new(2021, 8, 4, 12, 0,0), finish: DateTime.new(2021, 8, 4, 17, 30, 0), break: 60, user_id:1, organization_id:1, departed: false)
Shift.create(start: DateTime.new(2021, 8, 7, 10, 0,0), finish: DateTime.new(2021, 8, 7, 15, 15, 0), break: 30, user_id:1, organization_id:1, departed: false)
Shift.create(start: DateTime.new(2021, 8, 1, 16, 0,0), finish: DateTime.new(2021, 8, 1, 22, 0, 0), break: 60, user_id:1, organization_id:4, departed: true)
Shift.create(start: DateTime.new(2021, 7, 30, 20, 30,0), finish: DateTime.new(2021, 7, 31, 1, 15, 0), break: 30, user_id:1, organization_id:4, departed: true)

#Finn Shifts
Shift.create(start: DateTime.new(2021, 7, 14, 12, 0,0), finish: DateTime.new(2021, 7, 14, 17, 30, 0), break: 15, user_id:2, organization_id:1, departed: false)
Shift.create(start: DateTime.new(2021, 7, 17, 10, 0,0), finish: DateTime.new(2021, 7, 17, 15, 15, 0), break: 30, user_id:2, organization_id:1, departed: false)
Shift.create(start: DateTime.new(2021, 7, 11, 16, 0,0), finish: DateTime.new(2021, 7, 11, 22, 0, 0), break: 60, user_id:2, organization_id:2, departed: true)
Shift.create(start: DateTime.new(2021, 7, 8, 15, 30,0), finish: DateTime.new(2021, 7, 8, 20, 15, 0), break: 45, user_id:2, organization_id:3, departed: true)

#Elenor Shifts
Shift.create(start: DateTime.new(2021, 7, 16, 14, 0,0), finish: DateTime.new(2021, 7, 16, 18, 30, 0), break: 25, user_id:3, organization_id:2, departed: false)
Shift.create(start: DateTime.new(2021, 7, 21, 11, 0,0), finish: DateTime.new(2021, 7, 21, 16, 30, 0), break: 30, user_id:3, organization_id:2, departed: false)
Shift.create(start: DateTime.new(2021, 7, 10, 16, 0,0), finish: DateTime.new(2021, 7, 11, 2, 0, 0), break: 60, user_id:3, organization_id:3, departed: true)
Shift.create(start: DateTime.new(2021, 7, 3, 15, 30,0), finish: DateTime.new(2021, 7, 3, 20, 15, 0), break: 45, user_id:3, organization_id:3, departed: true)

#Sophie Shifts
Shift.create(start: DateTime.new(2021, 8, 8, 14, 0,0), finish: DateTime.new(2021, 8, 8, 18, 30, 0), break: 25, user_id:4, organization_id:2, departed: false)
Shift.create(start: DateTime.new(2021, 8, 5, 12, 0,0), finish: DateTime.new(2021, 8, 5, 16, 30, 0), break: 60, user_id:4, organization_id:2, departed: false)
Shift.create(start: DateTime.new(2021, 8, 1, 16, 0,0), finish: DateTime.new(2021, 8, 1, 20, 30, 0), break: 20, user_id:4, organization_id:1, departed: true)
Shift.create(start: DateTime.new(2021, 7, 28, 15, 30,0), finish: DateTime.new(2021, 7, 28, 20, 15, 0), break: 45, user_id:4, organization_id:1, departed: true)

#Andre Shifts
Shift.create(start: DateTime.new(2021, 8, 5, 8, 0,0), finish: DateTime.new(2021, 8, 5, 16, 30, 0), break: 70, user_id:5, organization_id:3, departed: false)
Shift.create(start: DateTime.new(2021, 8, 8, 12, 0,0), finish: DateTime.new(2021, 8, 8, 16, 30, 0), break: 30, user_id:5, organization_id:3, departed: false)
Shift.create(start: DateTime.new(2021, 8, 2, 16, 0,0), finish: DateTime.new(2021, 8, 2, 20, 30, 0), break: 20, user_id:5, organization_id:2, departed: true)
Shift.create(start: DateTime.new(2021, 7, 30, 15, 30,0), finish: DateTime.new(2021, 7, 30, 19, 15, 0), break: 0, user_id:5, organization_id:4, departed: true)

#Walter Shifts
Shift.create(start: DateTime.new(2021, 8, 5, 16, 0,0), finish: DateTime.new(2021, 8, 5, 22, 30, 0), break: 15, user_id:6, organization_id:3, departed: false)
Shift.create(start: DateTime.new(2021, 8, 8, 16, 0,0), finish: DateTime.new(2021, 8, 8, 23, 30, 0), break: 30, user_id:6, organization_id:3, departed: false)
Shift.create(start: DateTime.new(2021, 7, 24, 16, 0,0), finish: DateTime.new(2021, 7, 24, 20, 30, 0), break: 20, user_id:6, organization_id:1, departed: true)
Shift.create(start: DateTime.new(2021, 7, 26, 19, 30,0), finish: DateTime.new(2021, 7, 27, 0, 15, 0), break: 0, user_id:6, organization_id:2, departed: true)

#Tom Shifts
Shift.create(start: DateTime.new(2021, 8, 10, 16, 0,0), finish: DateTime.new(2021, 8, 10, 22, 30, 0), break: 15, user_id:7, organization_id:4, departed: false)
Shift.create(start: DateTime.new(2021, 8, 8, 16, 0,0), finish: DateTime.new(2021, 8, 8, 23, 30, 0), break: 30, user_id:7, organization_id:4, departed: false)
Shift.create(start: DateTime.new(2021, 7, 24, 16, 0,0), finish: DateTime.new(2021, 7, 24, 20, 30, 0), break: 20, user_id:7, organization_id:2, departed: true)
Shift.create(start: DateTime.new(2021, 7, 27, 12, 30,0), finish: DateTime.new(2021, 7, 27, 17, 15, 0), break: 0, user_id:7, organization_id:2, departed: true)

#Peter Shifts
Shift.create(start: DateTime.new(2021, 8, 7, 12, 0,0), finish: DateTime.new(2021, 8, 7, 22, 30, 0), break: 80, user_id:8, organization_id:4, departed: false)
Shift.create(start: DateTime.new(2021, 8, 9, 14, 0,0), finish: DateTime.new(2021, 8, 9, 21, 30, 0), break: 30, user_id:8, organization_id:4, departed: false)
Shift.create(start: DateTime.new(2021, 7, 22, 16, 0,0), finish: DateTime.new(2021, 7, 22, 20, 30, 0), break: 20, user_id:8, organization_id:3, departed: true)
Shift.create(start: DateTime.new(2021, 7, 25, 12, 30,0), finish: DateTime.new(2021, 7, 25, 17, 15, 0), break: 0, user_id:8, organization_id:1, departed: true)