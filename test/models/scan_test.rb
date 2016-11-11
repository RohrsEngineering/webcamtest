require 'test_helper'

class ScanTest < ActiveSupport::TestCase
  test "Creates a Scan with valid data" do
    scan = Scan.create(data: "Test One", number: 12345)
    assert scan.is_a?(Scan)
    assert scan.valid?
  end

  test "Does not create a Scan with no data" do
    scan = Scan.new(data: nil, number: 12345)
    assert_not scan.valid?
  end

  test "Does not create a Scan with no number" do
    scan = Scan.new(data: "Example", number: nil)
    assert_not scan.valid?
  end
end
