class ChatMessage < ApplicationRecord
  # normalize_attributes :content, with: %i[blank strip]

  belongs_to :chat, inverse_of: :messages

  validates :content, :chat_id, presence: true

  delegate :raw_schema, to: :chat, prefix: true

  after_create_commit lambda {
    broadcast_append_to "messages_from_chat_#{chat_id}",
                        html: ApplicationController.render(
                          MessageComponent.new(chat_message: self, go_down: true)
                        ),
                        target: 'chat_container'
  }
end
