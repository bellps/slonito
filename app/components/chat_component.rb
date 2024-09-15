# frozen_string_literal: true

class ChatComponent < ViewComponent::Base
  def initialize(chat:, visit: false)
    super
    @chat = chat
    @visit = visit
  end
end
