class Api::PhotosController < ApplicationController
	def index
		@photos = Photo.page(params[:page]).per(9)
		render json: {
			models: @photos.includes(:likes).order(params[:sort]),
			page_number: params[:page],
			total_pages: @photos.total_pages
		}
			
	end

	def show
		@photo = Photo.find(params[:id])
		render json: @photo
	end

	def create
		@photo = Photo.new(photo_params)
		@photo.user_id = current_user.id
		if @photo.save
			render json: @photo
		else
			render json: @photo.errors.full_messages.to_sentence
		end
	end

	private
	def photo_params
		params.require(:photo).permit(:user_id, :filepicker_url, :menu_item_id, :review, :place, :name, :rating, :restaurant_id)
	end
end
