MenuItem.create!([
  {name: "Galbi Bibimbap", price: nil},
  {name: "Kitten Bento Box Set", price: nil},
  {name: "Spicy Miso Ramen", price: nil},
  {name: "Eggs Benedict", price: nil},
  {name: "Kobe Beef", price: nil},
  {name: "Smoked Salmon Bagel", price: nil},
  {name: "Hamburger", price: nil},
  {name: "Strawberry Cheesecake", price: nil},
  {name: "Ahi Tuna", price: nil},
  {name: "Sushi", price: nil}
])
Photo.create!([
  {user_id: 1, review: "Stone pot!", filepicker_url: "https://www.filepicker.io/api/file/ObCTYYaWQyh6N8AxKtBb", place: "Koreana Food, Chestnut Street, Philadelphia, PA, United States", rating: 3, name: "Galbi Bibimbap", menu_item_id: 1, restaurant_id: 1},
  {user_id: 1, review: "Cat-nibble-ism! >=(", filepicker_url: "https://www.filepicker.io/api/file/j1HS2xL4TImXEQy1x2zQ", place: "Ramen Bar, Locust Street, Philadelphia, PA, United States", rating: 5, name: "Kitten Bento Box Set", menu_item_id: 2, restaurant_id: 2},
  {user_id: 1, review: "Ramen Profitable!", filepicker_url: "https://www.filepicker.io/api/file/9hfiWT5uQ8ecX6pqo1tu", place: "Ramen Bar, Locust Street, Philadelphia, PA, United States", rating: 5, name: "Spicy Miso Ramen", menu_item_id: 3, restaurant_id: 2},
  {user_id: 1, review: "this is so spicy!", filepicker_url: "https://www.filepicker.io/api/file/0ZlED1WLSNuGs9BzRuzn", place: "Ramen Underground, Kearny Street, San Francisco, CA, United States", rating: 5, name: "Spicy Miso Ramen", menu_item_id: 3, restaurant_id: 3},
  {user_id: 1, review: "This is another ramen... so sick", filepicker_url: "https://www.filepicker.io/api/file/prGUnHZ3QYyOZv3atnZI", place: "Ramen Yamadaya, Buchanan Street, San Francisco, CA, United States", rating: 2, name: "Spicy Miso Ramen", menu_item_id: 3, restaurant_id: 4},
  {user_id: 1, review: "This is delicious!", filepicker_url: "https://www.filepicker.io/api/file/nCaG5x1RqewgQ8aSrlSi", place: "Homeskillet, Market Street, San Francisco, CA, United States", rating: 4, name: "Eggs Benedict", menu_item_id: 4, restaurant_id: 5},
  {user_id: 1, review: "THIS IS SO GOOD", filepicker_url: "https://www.filepicker.io/api/file/sVcZvcVVRPa8RU2LLsdm", place: "Kobe Bento, Kearny Street, San Francisco, CA, United States", rating: 3, name: "Kobe Beef", menu_item_id: 5, restaurant_id: 6},
  {user_id: 1, review: "THIS IS SO GOOD 2", filepicker_url: "https://www.filepicker.io/api/file/BuMkE7waS1uEMJaRJOx4", place: "Homeskillet, Market Street, San Francisco, CA, United States", rating: 5, name: "Smoked Salmon Bagel", menu_item_id: 6, restaurant_id: 5},
  {user_id: 1, review: "Deserving of its Michelin Star", filepicker_url: "https://www.filepicker.io/api/file/xGMNVS4WTNuZGoWXM8ZC", place: "Danji, West 52nd Street, New York, NY, United States", rating: 5, name: "Hamburger", menu_item_id: 7, restaurant_id: 7},
  {user_id: 1, review: "cheesecake meh", filepicker_url: "https://www.filepicker.io/api/file/DbTqdedAQzytMpgQw9wm", place: "The Cheesecake Factory, Geary Street, San Francisco, CA, United States", rating: 2, name: "Strawberry Cheesecake", menu_item_id: 8, restaurant_id: 8},
  {user_id: 1, review: "I love tuna!", filepicker_url: "https://www.filepicker.io/api/file/VOxBqdoTSSZZCr2a7wwR", place: "White Dog Cafe, Sansom Street, Philadelphia, PA, United States", rating: 5, name: "Ahi Tuna", menu_item_id: 9, restaurant_id: 9},
  {user_id: 1, review: "This is so good", filepicker_url: "https://www.filepicker.io/api/file/EjJtLk4RRVu6ahKymI6g", place: "Fat Salmon Sushi, Walnut Street, Philadelphia, PA, United States", rating: 5, name: "Sushi", menu_item_id: 10, restaurant_id: 10},
  {user_id: 1, review: "This is sushi", filepicker_url: "https://www.filepicker.io/api/file/fXXVVv9eSau6ZnXInaDI", place: "Sushirrito, New Montgomery Street, San Francisco, CA, United States", rating: 3, name: "Sushi", menu_item_id: 10, restaurant_id: 11},
  {user_id: 1, review: "blah blah", filepicker_url: "https://www.filepicker.io/api/file/X5zQBAQAGmXGOwDEjJ9A", place: "Yuraku Japanese Restaurant, Frederick Road, Germantown, MD, United States", rating: 4, name: "Sushi", menu_item_id: 11, restaurant_id: 12},
  {user_id: 1, review: "so much sushi", filepicker_url: "https://www.filepicker.io/api/file/aKzeo2c6QGKN94rfCW8g", place: "Marina Sushi Bar, Lombard Street, San Francisco, CA, United States", rating: 4, name: "Sushi", menu_item_id: 10, restaurant_id: 13}
])
Restaurant.create!([
  {name: "Koreana Food, Chestnut Street, Philadelphia, PA, United States", rating: 3},
  {name: "Ramen Bar, Locust Street, Philadelphia, PA, United States", rating: 5},
  {name: "Ramen Underground, Kearny Street, San Francisco, CA, United States", rating: 5},
  {name: "Ramen Yamadaya, Buchanan Street, San Francisco, CA, United States", rating: 2},
  {name: "Homeskillet, Market Street, San Francisco, CA, United States", rating: 4},
  {name: "Kobe Bento, Kearny Street, San Francisco, CA, United States", rating: 3},
  {name: "Danji, West 52nd Street, New York, NY, United States", rating: 5},
  {name: "The Cheesecake Factory, Geary Street, San Francisco, CA, United States", rating: 2},
  {name: "White Dog Cafe, Sansom Street, Philadelphia, PA, United States", rating: 5},
  {name: "Fat Salmon Sushi, Walnut Street, Philadelphia, PA, United States", rating: 5},
  {name: "Sushirrito, New Montgomery Street, San Francisco, CA, United States", rating: 3},
  {name: "Yuraku Japanese Restaurant, Frederick Road, Germantown, MD, United States", rating: 4},
  {name: "Marina Sushi Bar, Lombard Street, San Francisco, CA, United States", rating: 4}
])
User.create!([
  {username: "markov", email: "markov@gmail.com", password_digest: "$2a$10$cKLeovmNr94KVPqtOWDLZOxyLrgCAtGTOxepavJnXAS375LPUrjmu", session_token: "TeYG5R5FgPHCnvrOPaaaGg"}
])
