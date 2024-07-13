class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories, status: :ok
  end

  def show
    category = Category.find(params[:id])
    render json: category, status: :ok
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    category = Category.find(params[:id])
    if category.update(category_params)
      render json: category, status: :ok
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    category = Category.find(params[:id])
    if category.products.any?
      render json: { error: 'Cannot delete category with associated products' }, status: :unprocessable_entity
    else
      category.destroy
      render json: { message: 'Category deleted' }, status: :ok
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :description)
  end
end
