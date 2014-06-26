require_relative 'lib/app'


use Rack::Static,
  :urls => ["/js", "/css"],
  :root => "public"


run App.new
