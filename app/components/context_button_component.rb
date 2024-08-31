# frozen_string_literal: true

class ContextButtonComponent < ViewComponent::Base
  def initialize(name:, dom_id:)
    super
    @name = name
    @dom_id = dom_id
  end
end
