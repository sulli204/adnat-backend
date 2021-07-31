require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module AdnatBackend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1
    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins 'http://localhost:3000'
    #     resource '/signup',
    #       methods: [:post],
    #       headers: :any,
    #       credentials: true
    #     resource '/login',
    #       methods: [:post],
    #       headers: :any,
    #       credentials: true
    #     resource '*', headers: :any, methods:[:get, :options]
    #   end
    # end
  end
end
