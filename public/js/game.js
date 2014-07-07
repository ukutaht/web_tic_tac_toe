GameBackend = {}

GameBackend.postMove  = function(index, binding, callback){
  $.ajax({
    type: 'POST',
    url: '/make_move',
    data: {move: index},
    success: callback.bind(binding) 
  })
}

GameBackend.startGame = function(formData, binding, callback){
  $.ajax({
    type: 'POST',
    url: '/start_game',
    data: formData,
    success: callback.bind(binding) 
  })
}

function Game(opts){
  this.backend = opts.backend
  this.renderer = opts.renderer
  this.boardElement = opts.boardElement
}

Game.prototype.start = function(settings){
  this.backend.startGame(settings, this, this.update)
  this.bindEvents()
}

Game.prototype.makeMove = function(index){
  this.backend.postMove(index, this, this.update) 
}

Game.prototype.update = function(response){
  this.updateAttributes(response);
  this.renderer.draw(this.board, this.boardElement)
  if(this.currentPlayerType == 'computer' && !this.over){
    this.makeMove(null);
  }
}

Game.prototype.updateAttributes = function(response){
  this.board = response.board;
  this.currentPlayer = response.current_player;
  this.currentPlayerType = response.player_type;
  this.winner = response.winner;
  this.over = response.over;
}

Game.prototype.bindEvents = function(){
  var that = this;
  this.boardElement.on('click', '.grid-cell', function(e){
    that.makeMove($(e.target).data('index')); 
  })
}
