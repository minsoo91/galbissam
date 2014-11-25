class UsersController < ApplicationController
	def show
		@user = current_user
	end

	def new
		@user = User.new
		render :new
	end

	def create
		@user = User.new(user_params)
		if @user.save
			sign_in!(@user)
			redirect_to root_url
		else
			flash.now[:errors] = @user.errors.full_messages.to_sentence
			render :new
		end
	end

	private
		def user_params
			params.require(:user).permit(:username, :email, :password)
		end
end
