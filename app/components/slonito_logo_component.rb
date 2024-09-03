# frozen_string_literal: true

# Elephant logo
class SlonitoLogoComponent < ViewComponent::Base
  def initialize(size: 9, extra_classes: '')
    super
    @size = size
    @extra_classes = extra_classes
  end
end
