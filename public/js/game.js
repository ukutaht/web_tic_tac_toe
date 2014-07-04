function Game(opts){
  this.board = opts.board;
  this.currentPlayer = opts.current_player;
  this.currentPlayerType = opts.player_type;
  this.winner = null;
  this.over = false;
  $('#board').html(this.draw());
  if(this.currentPlayerType == 'computer'){
    this.makeMove(null);
  }
}

Game.prototype.rowTemplate = "<div class='grid-row'> <% cells.forEach(function(mark, index){ %> <div class='grid-cell' data-index='<%= row*3 + index %>' > <span class='mark'><%= mark %></span> </div> <% }) %> </div>";


Game.prototype.update = function(response){
  this.board = response.board;
  this.currentPlayer = response.current_player;
  this.currentPlayerType = response.player_type;
  this.winner = response.winner;
  this.over = response.over;
}


Game.prototype.draw = function(){
  var boardString = "";
  var row = 0;
  while(this.board.length != 0){
    var rowCells = this.board.splice(0, 3)
    boardString = boardString + _.template(this.rowTemplate, {cells: rowCells, row: row});
    row++;
  }
  return boardString;
}

Game.prototype.handleResponse = function(response){
  this.update(response);
  $('#board').html(this.draw());
  if(this.currentPlayerType == 'computer' && !this.over){
    this.makeMove(null);
  }
}

Game.prototype.makeMove = function(index){
  var that = this;
  $.ajax({
    type: 'POST',
    url: '/make_move',
    data: {move: index},
    success: that.handleResponse.bind(that)
  })}

Game.prototype.unbindEvents = function(){
  $(document).unbind('click');
}

Game.prototype.bindEvents = function(){
  var that = this;
  $(document).on('click', '.grid-cell', function(e){
    that.makeMove($(e.target).data('index')); 
  })

}
