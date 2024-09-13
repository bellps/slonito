# frozen_string_literal: true

class SuccessToastComponent < ViewComponent::Base
  def initialize(message:)
    super
    @message = message
  end
end
