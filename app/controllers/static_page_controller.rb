class StaticPageController < ApplicationController
	def root
		if (!signed_in?) 
			redirect_to landing_url
		else
			render :root
		end
	end

	def splash
		render :splash
	end
end
