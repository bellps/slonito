class SlonitoApiService
  def initialize(message)
    @message = message
  end

  def get_response!
    Rails.logger.debug 'Sending question to Slonito...'

    response = HTTParty.post(
      "#{ENV.fetch('SLONITO_API_URL')}/generate",
      {
        body: {
          prompt: message.content,
          sql_schema: message.chat_raw_schema
        }.to_json,
        headers: {
          'Content-Type' => 'application/json'
        },
        timeout: 500_000
      }
    )

    Rails.logger.debug 'Slonito answered!'

    if response.code != 200
      "Ops! I found a error: #{response['detail']}"
    else
      answer = JSON.parse(response.body)['response']&.split('<end_of_turn>')&.last&.presence

      if answer.present? && answer != "\n<eos>"
        answer
      else
        "Oops! I couldn't find an answer for that 🤨. Can you please ask me again, with more details?"
      end
    end
  rescue StandardError => e
    "Sorry, I'm feeling a little dizzy and unable to answer you right now 😞. Please try again later! (#{e})"
  end

  attr_reader :message
end
