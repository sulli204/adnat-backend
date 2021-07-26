class User < ApplicationRecord
    belongs_to :organization
    
    validates :name, presence: true
    validates :email, presence: true
    has_secure_password
end
