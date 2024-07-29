class ProductsController < ApplicationController
  include Pagy::Backend
  def index
    items_per_page = params[:items] ? params[:items].to_i : 12  # Permite cambiar el número de items por página con un parámetro
    products = Product.with_attached_image.includes(:category).all
    @pagy, @products = pagy(products, items: items_per_page)
    @pagination = pagy_metadata(@pagy)

    render json: {
      data: @products.as_json(include: { category: {} }, methods: [:image_url]),
      pagination: @pagination
    }, status: :ok
  end

  def show
    product = Product.with_attached_image.includes(:category).find(params[:id])
    render json: product, status: :ok
  end

  def create
    product = Product.new(product_params)
    if product.save
      render json: product, methods: [:image_url], status: :created
    else
      render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    product = Product.find(params[:id])
    if product.update(product_params)
      render json: product, methods: [:image_url], status: :ok
    else
      render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    product = Product.find(params[:id])
    product.destroy
    render json: { message: 'Product deleted' }, status: :ok
  end

  def search
    items_per_page = params[:items] ? params[:items].to_i : 12
    search_term = params[:product_name]

    products = Product.with_attached_image.includes(:category)

    if search_term.present?
      products = products.where("name ILIKE ?", "%#{search_term}%")
    end

    @pagy, @products = pagy(products, items: items_per_page)
    @pagination = pagy_metadata(@pagy)

    render json: {
      data: @products.as_json(include: { category: {} }, methods: [:image_url]),
      pagination: @pagination
    }, status: :ok
  end

  private

  def product_params
    params.require(:product).permit(:name, :description, :price, :category_id, :image)
  end
end
