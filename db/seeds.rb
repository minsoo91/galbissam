# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create([{ username: "minsoo"}, 
	         {email: "minsoo91@gmail.com"},
	         {password_digest: "$2a$10$HoW0cUKlMlzPY.Hv5WR.D.6BzP4c7mvWbXavOQ.geaZkWZUHkT3Sa"}
	         ])

Photo.create([{ user_id: 1},
			  { review: "sushi at Jiro's <3"},
			  { filepicker_url: "https://www.filepicker.io/api/file/JjQrJboiSlSztMxpgXPw"}
			 ])