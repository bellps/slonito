# frozen_string_literal: true

class MessageComponent < ViewComponent::Base
  with_collection_parameter :chat_message

  def initialize(chat_message:, go_down: false)
    super
    @chat_message = chat_message
    @go_down = go_down
  end
end
