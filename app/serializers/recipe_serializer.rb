class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :time, :instructions, :description
end
