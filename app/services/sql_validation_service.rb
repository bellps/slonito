class SqlValidationService
  def initialize
    @script = script
  end

  def verify!
    result = PgQuery.parse(sql)

    { valid: true, message: result }
  rescue PgQuery::ParseError => e
    { valid: false, message: e.message }
  end

  private

  attr_accessor :script
end
