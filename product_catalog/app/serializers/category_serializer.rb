# app/serializers/category_serializer.rb
class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description
end
