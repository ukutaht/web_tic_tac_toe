require_relative 'lib/app'


use Rack::Static,
  :urls => ["/js", "/css", "/img"],
  :root => "public"


run App.new
