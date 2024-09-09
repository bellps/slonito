# frozen_string_literal: true

class DatabaseNavigationComponent < ViewComponent::Base
  def initialize(chats:)
    super
    @chats = chats
  end
end
