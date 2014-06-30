function GameResource(){
}

GameResource.prototype.postMove = function(index, callback){
    $.post('/make_move', {move: index}, function(response){
      callback(response);
  })
}

function Game(opts){
  this.board = opts.board;
  this.currentPlayer = opts.current_player;
  this.currentPlayerType = opts.player_type;
  this.winner = null;
  this.resource = opts.resource
  
  this.rowTemplate = "<div class='grid-row'> <% cells.forEach(function(mark, index){ %> <div class='grid-cell' data-index='<%= row*3 + index %>' > <span class='mark'> <%= mark %> </span> </div> <% }) %> </div>"

  this.draw()
  this.bindEvents();
}

Game.prototype.makeMove = function(index){
  var that = this

  this.resource.postMove(index, function(response){
    that.board = response.board;
    that.currentPlayer = response.current_player;
    that.winner = response.winner;
    that.currentPlayerType = response.player_type;
    that.draw()
  });
}

Game.prototype.draw = function(){
  var boardString = ""
  var row = 0
  while(this.board.length != 0){
    var rowCells = this.board.splice(0, 3)
    boardString = boardString + _.template(this.rowTemplate, {cells: rowCells, row: row});
    row++;
  }
  $('#board').html(boardString)
}

Game.prototype.bindEvents = function(){
  var that = this;
  $(document).on('click', '.grid-cell', function(e){
    that.makeMove($(e.target).data('index')); 
  })

  window.setInterval(function(){that.makeMove(null)}, 100)
}
