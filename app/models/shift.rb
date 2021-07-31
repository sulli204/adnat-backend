class Shift < ApplicationRecord
  belongs_to :user

  validates :start, presence: true
  validates :finish, presence: true
  validates :break , presence: true, numericality: { greater_than_or_equal_to: 0 }
end
