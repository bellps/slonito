# frozen_string_literal: true

class ChatComponent < ViewComponent::Base
  def initialize(chat:)
    super
    @chat = chat
  end
end
