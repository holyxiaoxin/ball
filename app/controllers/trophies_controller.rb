class TrophiesController < ApplicationController
  before_action :set_trophy, only: [:show, :edit, :update, :destroy]

  def index
    @trophies = Trophy.all
  end

  def show
  end

  def new
    @trophy = Trophy.new
  end

  def edit
  end

  def create
    @trophy = Trophy.new(trophy_params)

    respond_to do |format|
      if @trophy.save
        format.html { redirect_to @trophy, notice: 'Trophy was successfully created.' }
        format.json { render :show, status: :created, location: @trophy }
      else
        format.html { render :new }
        format.json { render json: @trophy.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @trophy.update(trophy_params)
        format.html { redirect_to @trophy, notice: 'Trophy was successfully updated.' }
        format.json { render :show, status: :ok, location: @trophy }
      else
        format.html { render :edit }
        format.json { render json: @trophy.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
  @trophy.destroy
  respond_to do |format|
    format.html { redirect_to trophies_url, notice: 'Trophy was successfully destroyed.' }
    format.json { head :no_content }
  end
end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_trophy
    @trophy = Trophy.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def trophy_params
    params.require(:trophy).permit(:src, :alt, :description)
  end


end
