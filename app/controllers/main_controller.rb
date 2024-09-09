class MainController < ApplicationController
  layout 'main'

  before_action :authenticate_user!

  def index
    @chats = Chat.where(user_id: current_user.id)
  end
end
