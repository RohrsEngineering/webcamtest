class ScansController < ApplicationController
  def new
    @scan = Scan.new
  end

  def create
    @scan = Scan.new(scan_params)
    if @scan.save
      redirect_to :root, notice: "Saved scan successfully!"
    else
      redirect_to :root, alert: "Unable to save scan: #{@scan.errors}"
    end
  end

  def index
    @scans = Scan.all
  end

  private
  def scan_params
    params.require(:scan).permit(:data, :number)
  end
end
