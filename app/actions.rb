# Homepage (Root path)
get '/' do
  erb :index
end

get '/recipes' do
  url = URI.escape("http://food2fork.com/api/search?key=9bd95bea53f5b286b7ffbaa71fb5cbe5&q=#{params[:query]}&count=10")
  uri = URI.parse(url)
  Net::HTTP.get(uri).to_json
end

get '/recipe/:id' do
  url = URI.escape("http://food2fork.com/api/get?key=9bd95bea53f5b286b7ffbaa71fb5cbe5&rid=#{params[:id]}")
  uri = URI.parse(url)
  Net::HTTP.get(uri).to_json
end