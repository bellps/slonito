class ChatsController < ApplicationController
  layout false
  layout 'main', except: :index

  before_action :authenticate_user!

  def index
    @chats = Chat.where(user_id: current_user.id).order(created_at: :desc)

    return if params[:query].blank?

    @chats = @chats.where('name ILIKE ?', "%#{params[:query]}%")
  end

  def show
    @chat = Chat.where(id: params[:id], user_id: current_user.id).first!

    respond_to do |format|
      format.turbo_stream
      format.html
    end
  end

  def new
    @chat = Chat.new
  end

  def create
    @chat = Chat.new(chat_params)
    @chat.user_id = current_user.id

    if @chat.save
      respond_to(&:turbo_stream)
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def chat_params
    params.require(:chat).permit(:name, :raw_schema)
  end
end
