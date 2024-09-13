class SqlValidationService
  def initialize(script)
    @script = script
  end

  def verify!
    result = PgQuery.parse(script)

    @valid = true
    @parsed_result = result

    self
  rescue PgQuery::ParseError => e
    @valid = false
    @error = e.message

    self
  end

  def valid?
    @valid
  end

  attr_accessor :parsed_result, :error

  private

  attr_accessor :script, :valid
end
