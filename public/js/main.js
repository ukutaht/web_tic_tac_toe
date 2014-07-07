$(function(){
  $(document).on('submit', '#start-game-form', function(e){
    e.preventDefault();
    var data = $(this).serialize();
    var game = new Game({
      backend:  GameBackend, 
      renderer: GameRenderer,
      boardElement: $('#board')
    })
    game.start(data)
  })
})
