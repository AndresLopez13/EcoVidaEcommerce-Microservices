class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :created_at, :updated_at, :image_url
  belongs_to :category
end
