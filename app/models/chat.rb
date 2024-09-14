class Chat < ApplicationRecord
  belongs_to :user
  has_many :messages, class_name: 'ChatMessage'

  normalize_attributes :name, with: %i[blank squish]
  normalize_attributes :raw_schema, with: %i[blank strip]

  validates :name, :raw_schema, :user_id, presence: true
  validate :schema_with_valid_sql

  def schema_with_valid_sql
    validator = SqlValidationService.new(raw_schema).verify!

    if validator.valid?
      if validator.parsed_result.tables.empty? || raw_schema.exclude?('CREATE TABLE')
        errors.add(:base, 'No tables detected, please define tables in your schema to be able to work with Slonito')
      else
        self.tables = validator.parsed_result.tables

        true
      end
    else
      errors.add(:base, "Invalid SQL: #{validator.error}")
    end
  end
end
