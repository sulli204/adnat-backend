class Organization < ApplicationRecord
    has_many :users

    validates :name, presence: true
    validates :hourly, presence: true, numericality: { greater_than: 7.25 } #National Minimum Wage
end
