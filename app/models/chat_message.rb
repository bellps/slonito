class ChatMessage < ApplicationRecord
  normalize_attributes :content, with: %i[blank strip]

  belongs_to :chat, inverse_of: :messages

  validates :content, :chat_id, presence: true
end
