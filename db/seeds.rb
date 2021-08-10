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