class MainController < ApplicationController
  layout 'main'

  before_action :authenticate_user!

  def index; end
end
