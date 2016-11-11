class Scan < ActiveRecord::Base
  validates :data, presence: true
  validates :number, presence: true
end
