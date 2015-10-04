class BallsController < ApplicationController
  def index
    @trophies = Trophy.all
    render :index
  end
end
