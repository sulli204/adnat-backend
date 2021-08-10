class User < ApplicationRecord
    belongs_to :organization, optional: true
    has_many :shifts
    
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true, 
        format: {with: /\A[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\z/}
    has_secure_password
end
