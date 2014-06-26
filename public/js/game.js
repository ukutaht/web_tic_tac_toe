function Game(opts){
  this.board = opts.board;
  this.currentPlayer = opts.currentPlayer;
  this.currentPlayerType = opts.currentPlayerType;
  this.winner = null;
  this.draw()
}

Game.prototype.makeMove = function(index){
  var that = this

  $.post('/make_move', {move: index}, function(response){
    that.board = response.board;
    that.currentPlayer = response.current_player;
    that.winner = response.winner;
    that.currentPlayerType = response.player_type;
    that.draw()
  });
}

Game.prototype.draw = function(){
  $('#board').html(this.board.join(','));
}
