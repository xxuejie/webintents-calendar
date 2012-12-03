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
  d.strftime('%Y-%m-%dT%H:%M:%SZ')
end

post '/parse' do
  request.body.rewind
  result = Nickel.parse request.body.read

  {title: result.message, time: generate_time(result.occurrences.first)}.to_json
end
