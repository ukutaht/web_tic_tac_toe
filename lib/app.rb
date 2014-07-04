require 'rack'
require 'tic_tac_toe-core'
require 'json'

class App
  def call(env)
    request = Rack::Request.new(env)
    case request.path
    when '/start_game'
      @lock = false
      start_game(request.params)
    when '/make_move'
      return teapot_response if @lock
      make_move(request.params)
    when '/'
      serve_root
    end
  end

  def start_game(params)
    @game = TicTacToe::Core::Game.from_hash(params)
    send_game(@game)
  end

  def make_move(params)
    with_lock do
      move = params['move'].empty? ? nil : params['move'].to_i
      @game.play_next_move(move)
    end
    send_game(@game)
  end

  def send_game(game)
    respond_with(board: game.board_string.chars.to_a,
                 current_player: game.current_player.mark,
                 winner: game.winner,
                 over: game.over?,
                 player_type: game.current_player.human? ? 'human' : 'computer')
  end

  def respond_with(hash)
    response = Rack::Response.new
    response['Content-Type'] = 'application/json'
    response.body = [JSON.generate(hash)]
    response.status = 200
    response.finish
  end

  def with_lock
    @lock = true
    yield
    @lock = false
  end

  def teapot_response
    [418, {'Content-Type'  => 'text/plain'}, ["Fuck it, we'll do it live"]]
  end

  def serve_root
    [200, {'Content-Type'  => 'text/html'}, File.open('public/index.html', File::RDONLY)]
  end
end
