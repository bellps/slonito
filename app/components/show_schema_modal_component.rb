# frozen_string_literal: true

class ShowSchemaModalComponent < ViewComponent::Base
  def initialize(chat:)
    super
    @chat = chat
  end
end
