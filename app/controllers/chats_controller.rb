class ChatsController < ApplicationController
  before_action :authenticate_user!

  def index
    @chats = Chat.where(user_id: current_user.id)

    return if params[:query].blank?

    @chats = @chats.where('name ILIKE ?', "%#{params[:query]}%")
  end
end
