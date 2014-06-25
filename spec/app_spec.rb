require 'spec_helper'
require 'app'

describe App do
  let(:request) { Rack::MockRequest.new(App.new) }

  context 'default settings' do
    let(:post_params) { JSON.generate(game_type: "human_vs_human", board_size: "3") }
    let(:response) { request.post('/start_game', params: post_params) }

    it 'returns empty board' do
      board = JSON.parse(response.body)["board"]
      expect(board.size).to eq 9
    end

    it 'returns current player' do
      current_player = JSON.parse(response.body)["current_player"]
      expect(current_player).to eq "X"
    end

    it 'returns player type' do
      player_type = JSON.parse(response.body)["player_type"]
      expect(player_type).to eq "human"
    end
  end

  context 'computer vs human with 4x4' do
    let(:post_params) { JSON.generate(game_type: "computer_goes_first", board_size: "4") }
    let(:response) { request.post('/start_game', params: post_params) }

    it 'returns empty board' do
      board = JSON.parse(response.body)["board"]
      expect(board.size).to eq 16
    end

    it 'returns current player' do
      current_player = JSON.parse(response.body)["current_player"]
      expect(current_player).to eq "X"
    end

    it 'returns player type' do
      player_type = JSON.parse(response.body)["player_type"]
      expect(player_type).to eq "computer"
    end
  end

end
