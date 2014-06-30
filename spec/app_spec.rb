require 'spec_helper'
require 'app'

describe App do
  let(:request) { Rack::MockRequest.new(App.new) }

  describe 'starting a game' do
    context 'default settings' do
      let(:post_params) { {game_type: "human_vs_human", board_size: "3"} }
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
      let(:post_params) { {game_type: "computer_goes_first", board_size: "4"} }
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

  describe 'playing a game' do
    before do
      params = {game_type: "human_vs_human", board_size: "3"}
      request.post('/start_game', params: params) 
    end

    it 'responds with a board where move is made' do
      response = request.post('/make_move', params: JSON.generate(move: "0") )
      board = JSON.parse(response.body)["board"]
      expect(board[0]).to eq "X"
    end

    it 'can tell when game is over' do
      ["0", "3", "1"].each do |move|
        request.post('/make_move', params: {move: move })
      end
      res = request.post('/make_move', params: {move: "4" })
      winner = JSON.parse(res.body)["winner"]
      expect(winner).to be_nil

      res = request.post('/make_move', params: {move: "2" })
      winner = JSON.parse(res.body)["winner"]
      expect(winner).to eq "X"
    end
  end
end
