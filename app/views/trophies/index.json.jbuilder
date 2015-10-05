json.array!(@trophies) do |trophy|
  json.extract! trophy, :id, :title, :body, :published
  json.url trophy_url(trophy, format: :json)
end
