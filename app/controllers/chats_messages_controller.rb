class ChatsMessagesController < ApplicationController
  layout 'main'

  before_action :authenticate_user!

  def create
    @message = ChatMessage.new(chat_message_params)
    @message.is_input = true

    if @message.save
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def chat_message_params
    params.require(:chat_message).permit(:content, :chat_id)
  end
end
