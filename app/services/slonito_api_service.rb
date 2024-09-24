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
      answer = JSON.parse(response.body)['response']

      "\n#{answer.split("\n\n\n", 2)[1]}"
    end
  rescue StandardError => e
    "Sorry, I'm feeling a little dizzy and unable to answer you right now 😞. Please try again later! (#{e})"
  end

  attr_reader :message
end
