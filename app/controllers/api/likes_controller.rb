class Api::LikesController < ApplicationController
	def index
		@likes = Like.all
		render json: @likes
	end

	def show
		@like = Like.find(params[:id])
		render json: @like
	end

	def create
		@like = Like.new(like_params)
		if @like.save
			render json: @like
		else
			render json: @like.errors.full_messages.to_sentence
		end
	end

	def destroy
		@like = Like.find(params[:id])
		@like.destroy!
		render json: @like
	end

	private
	def like_params
		params.require(:like).permit(:photo_id, :user_id)
	end
end