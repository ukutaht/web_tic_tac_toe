$(function(){
  $(document).on('submit', '#start-game-form', function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $.post('/start_game', data, function(response){
      response.resource = new GameResource();
      new Game(response); 
    })
  })
})
