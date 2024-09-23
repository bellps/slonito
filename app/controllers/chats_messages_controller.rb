class ChatsMessagesController < ApplicationController
  layout 'main'

  before_action :authenticate_user!

  def create
    @message = ChatMessage.new(chat_message_params)
    @message.is_input = true

    if @message.save
      generate_response

      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def chat_message_params
    params.require(:chat_message).permit(:content, :chat_id)
  end

  def generate_response
    response = ChatMessage.new(is_input: false, chat_id: @message.chat_id)

    response.content = get_llm_response
    response.save
  end

  def get_llm_response
    response = HTTParty.post(
      "#{ENV.fetch('SLONITO_API_URL')}/generate",
      {
        body: {
          prompt: @message.content,
          sql_schema: @message.chat_raw_schema
        }.to_json,
        headers: {
          'Content-Type' => 'application/json'
        },
        timeout: 500000
      }
    )

    JSON.parse(response.body)['response']
  end
end
