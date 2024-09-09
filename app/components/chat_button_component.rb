# frozen_string_literal: true

class ChatButtonComponent < ViewComponent::Base
  with_collection_parameter :chat

  def initialize(chat:)
    super
    @chat = chat
    @dom_id = "chat_instance_#{chat.id}"
  end
end
