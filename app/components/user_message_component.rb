# frozen_string_literal: true

class UserMessageComponent < ViewComponent::Base
    def initialize(chat_message:)
      super
      @chat_message = chat_message
    end
  end
