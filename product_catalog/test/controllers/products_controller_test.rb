require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @product = products(:bamboo_toothbrush)
  end

  test "should get index" do
    get products_url, as: :json
    assert_response :success
    assert_not_empty JSON.parse(@response.body)
  end

  test "should create product" do
    assert_difference("Product.count") do
      post products_url, params: { product: {
        name: "New Product",
        description: "New Description",
        price: 9.99,
        category_id: categories(:hygiene).id
      } }, as: :json
    end

    assert_response :created
    assert_equal "New Product", JSON.parse(@response.body)["name"]
  end

  test "should show product" do
    get product_url(@product), as: :json
    assert_response :success
    assert_equal @product.name, JSON.parse(@response.body)["name"]
  end

  test "should update product" do
    patch product_url(@product), params: { product: { name: "Updated Product" } }, as: :json
    assert_response :success
    assert_equal "Updated Product", JSON.parse(@response.body)["name"]
  end

  test "should destroy product" do
    assert_difference("Product.count", -1) do
      delete product_url(@product), as: :json
    end

    assert_response :success
    assert_equal "Product deleted", JSON.parse(@response.body)["message"]
  end

  test "should search products" do
    get search_products_url(product_name: "Shampoo"), as: :json
    assert_response :success

    response_body = JSON.parse(@response.body)
    assert_equal 1, response_body['data'].length
    assert_equal "Shampoo Orgánico de Lavanda", response_body['data'][0]['name']

    get search_products_url(product_name: "Cepillo"), as: :json
    assert_response :success

    response_body = JSON.parse(@response.body)
    assert_equal 1, response_body['data'].length
    assert_equal "Cepillo de Dientes de Bambú", response_body['data'][0]['name']
  end
end
