class SessionsController < ApplicationController
	def new
		render :new
	end

	def create
		email = params[:user][:email]
		password = params[:user][:password]
		@user = User.find_by_credentials(email, password)

		if @user
			sign_in!(@user)
			redirect_to root_url
		else
			flash.now[:errors] = "Email and Password Combination is incorrect"
			render :new
		end
	end

	def destroy
		sign_out!(current_user)
		redirect_to root_url
	end
end
