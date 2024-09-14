# frozen_string_literal: true

class MessageInputComponent < ViewComponent::Base
  def initialize(chat:)
    super
    @chat = chat
  end
end
