class SlonitoApiService
  def initialize(message)
    @message = message
  end

  def get_response!
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

    JSON.parse(response.body)['response']
  rescue => _e
    "Sorry, I'm feeling a little dizzy and unable to answer you right now 😞. Please try again later!"
  end

  attr_reader :message
end
