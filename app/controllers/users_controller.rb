class UsersController < ApplicationController
	def show
		@user = current_user
	end

	def new
		@user = User.new
		render :new
	end

	def create
		@user = User.new(params)
		if @user.save
			redirect_to user_url
		else
			render :new
		end
	end

	private
		def user_params
			params.require(:user).permit(:username, :email, :password)
		end
end
