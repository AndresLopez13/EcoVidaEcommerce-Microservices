class ProductsController < ApplicationController
  def index
    products = Product.with_attached_image.includes(:category).all
    render json: products, status: :ok
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

  private

  def product_params
    params.require(:product).permit(:name, :description, :price, :category_id, :image)
  end
end
