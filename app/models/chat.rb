class Chat < ApplicationRecord
  belongs_to :user

  validates :name, :raw_schema, :user_id, presence: true
end
