class CreateChatMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :chat_messages do |t|
      t.references :chat, null: false, foreign_key: true, index: true
      t.text :content, null: false
      t.boolean :is_input, default: false, null: false

      t.timestamps
    end
  end
end
