class Product < ApplicationRecord
  belongs_to :category
  has_one_attached :image

  def image_url
    Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) if image.attached?
  end
end
