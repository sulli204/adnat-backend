class User < ApplicationRecord
    belongs_to :organization, optional: true
    has_many :shifts
    
    validates :name, presence: true
    validates :email, presence: true
    has_secure_password
end
