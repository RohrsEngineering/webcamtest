class TagsController < ApplicationController
  before_action :require_user, only: [:index, :show]
  def new
    @tag = Tag.new
  end

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      redirect_to :root, notice: "Saved tag successfully!"
    else
      redirect_to :root, alert: "Unable to save tag: #{@tag.errors}"
    end
  end

  def index
    @tags = Tag.all
  end

  private
  def tag_params
    params.require(:tag).permit(:data, :number)
  end
end
