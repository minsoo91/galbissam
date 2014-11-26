class Api::PhotosController < ApplicationController
	def index
		@photos = Photo.all
		render json: @photos
	end

	def show
		@photo = Photo.find(params[:id])
		render json: @photo
	end

	def create
		@photo = Photo.new(photo_params)
		if @photo.save
			render json: @photo
		else
			render json: @photo.errors.full_messages
		end
	end

	private
	def photo_params
		params.require(:photo).permit(:user_id, :filepicker_url, :review)
	end
end