require 'nickel'
require 'json'
require 'sinatra'

def generate_time occurrence
  if occurrence && (sd = occurrence.start_date) && (st = occurrence.start_time)
    # TODO: set timezone dynamically
    d = DateTime.new(sd.year, sd.month, sd.day, st.hour, st.minute, st.second, '-5')
  else
    d = DateTime.now
  end
  d.rfc3339
end

post '/parse' do
  request.body.rewind
  str = request.body.read
  if str.empty?
    {}.to_json
  else
    result = Nickel.parse str
    {title: result.message, time: generate_time(result.occurrences.first)}.to_json
  end
end
