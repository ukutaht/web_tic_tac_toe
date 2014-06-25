require 'rack'
require 'tic_tac_toe-core'
require 'json'

class App

  def call(env)
    request = Rack::Request.new(env)
    game = game_from(request.body.read.to_s)
    respond_with(board: game.board_string.chars.to_a,
                 current_player: game.current_player.mark,
                 player_type: game.current_player.human? ? 'human' : 'computer')
  end

  def game_from(opts)
    opts = JSON.parse(opts)

    game = TicTacToe::Core::Game.new
    game.send(opts['game_type'])
    game.set_board_size(opts['board_size'].to_i)
    game
  end

  def respond_with(hash)
    response = Rack::Response.new
    response['Content-Type'] = 'application/json'
    response.body = [JSON.generate(hash)]
    response.status = 200
    response.finish
  end
end
