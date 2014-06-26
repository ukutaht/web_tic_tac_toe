require 'rack'
require 'tic_tac_toe-core'
require 'json'

class App
  def call(env)
    request = Rack::Request.new(env)
    request_body = JSON.parse(request.body.read.to_s)
    case request.path
    when '/start_game'
      start_game(request_body)
    when '/make_move'
      make_move(request_body)
    end
  end

  def start_game(params)
    @game = game_from(params)
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

  def game_from(opts)
    TicTacToe::Core::Game.from_hash(opts)
  end

  def respond_with(hash)
    response = Rack::Response.new
    response['Content-Type'] = 'application/json'
    response.body = [JSON.generate(hash)]
    response.status = 200
    response.finish
  end
end
