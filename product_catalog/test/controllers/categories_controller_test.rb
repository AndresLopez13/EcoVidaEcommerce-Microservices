require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @category = categories(:hygiene)
  end

  test "should get index" do
    get categories_url, as: :json
    assert_response :success
    assert_not_empty JSON.parse(@response.body)
  end

  test "should create category" do
    assert_difference("Category.count") do
      post categories_url, params: { category: { name: "New Category", description: "New Description" } }, as: :json
    end

    assert_response :created
    assert_equal "New Category", JSON.parse(@response.body)["name"]
  end

  test "should show category" do
    get category_url(@category), as: :json
    assert_response :success
    assert_equal @category.name, JSON.parse(@response.body)["name"]
  end

  test "should update category" do
    patch category_url(@category), params: { category: { name: "Updated Category" } }, as: :json
    assert_response :success
    assert_equal "Updated Category", JSON.parse(@response.body)["name"]
  end

  test "should destroy category without products" do
    category_without_products = categories(:sustainable_utensils)
    assert_difference("Category.count", -1) do
      delete category_url(category_without_products), as: :json
    end

    assert_response :success
    assert_equal "Category deleted", JSON.parse(@response.body)["message"]
  end

  test "should not destroy category with products" do
    category_with_products = categories(:hygiene)
    assert_no_difference("Category.count") do
      delete category_url(category_with_products), as: :json
    end

    assert_response :unprocessable_entity
    assert_equal "Cannot delete category with associated products", JSON.parse(@response.body)["error"]
  end
end
