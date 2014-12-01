class StaticPageController < ApplicationController
	before_action :require_signin!, only: [:root]
	def root
		render :root
	end

	def splash
		render :splash
	end
end
