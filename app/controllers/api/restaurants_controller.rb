class Api::RestaurantsController < ApplicationController
	def index
		@restaurants = Restaurant.all
		render json: @restaurants
	end

	def show
		@restaurant = Restaurant.find(params[:id])
		render json: @restaurant.to_json(include: :photos)
	end

	def create
		@restaurant = Restaurant.new(restaurant_params)
		if @restaurant.save
			render json: @restaurant
		else
			render json: @restaurant.errors.full_messages.to_sentence
		end
	end

	def update
		@restaurant = Restaurant.find(params[:id])
		if @restaurant.update(restaurant_params)
			render json: @restaurant
		else
			render json: @restaurant.errors.full_messages.to_sentence
		end
	end
	
	private
	def restaurant_params
		params.require(:restaurant).permit(:name, :rating)
	end
end
