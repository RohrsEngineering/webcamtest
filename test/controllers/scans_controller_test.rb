require 'test_helper'

class ScansControllerTest < ActionController::TestCase
  test "#new assigns a new @scan object" do
    get :new
    assert assigns(:scan).present?
  end

  test "#create saves a new @scan object" do
    assert_difference "Scan.count", 1 do
      post :create, scan: { data: "Test", number: 5 }
    end
  end

  test "#create does not save the @scan object with invalid data" do
    assert_difference "Scan.count", 0 do
      post :create, scan: { data: nil, number: nil }
    end
    assert flash[:alert].present?
    assert_redirected_to root_path
  end

  test "#index returns all scans" do
    scan_count = Scan.count
    get :index
    assert assigns(:scans).size == scan_count
  end
end
