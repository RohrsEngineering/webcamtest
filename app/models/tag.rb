class Tag < ApplicationRecord
  validates :data, presence: true
  validates :number, presence: true
end
