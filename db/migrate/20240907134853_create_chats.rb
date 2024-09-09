class CreateChats < ActiveRecord::Migration[7.1]
  def change
    create_table :chats do |t|
      t.string :name, null: false
      t.references :user, null: false, foreign_key: true, index: true
      t.text :raw_schema, null: false

      t.timestamps
    end
  end
end
