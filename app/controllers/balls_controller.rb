class BallsController < ApplicationController
  def index
    @trophies = Trophy.all.order(:id)
    render :index
  end
end
