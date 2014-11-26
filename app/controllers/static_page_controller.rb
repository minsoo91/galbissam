class StaticPageController < ApplicationController
	before_action :require_signin!
	def root
		render :root
	end
end
