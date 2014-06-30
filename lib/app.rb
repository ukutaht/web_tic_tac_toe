require 'rack'
require 'tic_tac_toe-core'
require 'json'

class App
  def call(env)
    request = Rack::Request.new(env)
    case request.path
    when '/start_game'
      start_game(request.params)
    when '/make_move'
      make_move(request.params)
    when '/'
      serve_root
    end
  end

  def start_game(params)
    @game = TicTacToe::Core::Game.from_hash(opts)
    send_game(@game)
  end

  def make_move(params)
    @game.play_next_move(params['move'].to_i)
    send_game(@game)
  end

  def send_game(game)
    respond_with(board: game.board_string.chars.to_a,
                 current_player: game.current_player.mark,
                 winner: game.winner,
                 player_type: game.current_player.human? ? 'human' : 'computer')
  end

  def respond_with(hash)
    response = Rack::Response.new
    response['Content-Type'] = 'application/json'
    response.body = [JSON.generate(hash)]
    response.status = 200
    response.finish
  end

  def serve_root
    [200, {'Content-Type'  => 'text/html'}, File.open('public/index.html', File::RDONLY)]
  end
end
