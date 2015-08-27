# Homepage (Root path)
get '/' do
  erb :index
end

get '/recipes' do
  uri = URI.parse('http://food2fork.com/api/search?key=9bd95bea53f5b286b7ffbaa71fb5cbe5&q=shredded%20chicken')
  Net::HTTP.get(uri).to_json
end