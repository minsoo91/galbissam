class Api::MenuitemsController < ApplicationController
	def index
		@menu_items = MenuItem.all
		render json: @menu_items
	end

	def show
		@menu_items = MenuItem.find(params[:id])
	end

	def create
		@menu_item = MenuItem.new(menu_params)
		if @menu_item.save
			render json: @menu_item
		else
			render json: @menu_item.errors.full_messages.to_sentence
		end
	end

	private
	def menu_params
		params.require(:menuitem).permit(:name, :price)
	end
end