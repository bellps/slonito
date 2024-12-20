class ChatMessage < ApplicationRecord
  # normalize_attributes :content, with: %i[blank strip]

  belongs_to :chat, inverse_of: :messages

  validates :content, :chat_id, presence: true

  delegate :raw_schema, to: :chat, prefix: true

  after_create_commit :send_user_message

  def content_to_markdown
    "\n#{content}\n"
  end

  def send_user_message
    if is_input?
      broadcast_remove_to "messages_from_chat_#{chat_id}", target: 'waiting_slonito_answer'
  
      broadcast_append_to "messages_from_chat_#{chat_id}",
                          renderable: UserMessageComponent.new(chat_message: self),
                          target: 'chat_container'
                      
      broadcast_append_to "messages_from_chat_#{chat_id}",
                          renderable: WaitingAnswerComponent.new,
                          target: 'chat_container'
    else
      broadcast_replace_to "messages_from_chat_#{chat_id}",
                           target: 'waiting_slonito_answer',
                           renderable: SlonitoMessageComponent.new(chat_message: self)
    end
  end
end
