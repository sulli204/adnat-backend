class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    # protect_from_forgery with: :exception

    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end
    helper_method :current_user

    def authenticate_user!
        redirect_to '/login' unless current_user
    end

    def logged_in?
        !current_user.nil?
    end
    helper_method :logged_in?

    
end
