class AddTablesToChats < ActiveRecord::Migration[7.1]
  def change
    add_column :chats, :tables, :text, array: true, default: []
  end
end
