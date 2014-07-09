describe('game', function(){
  var game;
  var fakeBackend = jasmine.createSpyObj('fakeBackend', ['postMove', 'startGame'])
  var fakeRenderer = jasmine.createSpyObj('fakeRenderer', ['draw'])
  var fakeBoardElement = jasmine.createSpyObj('fakeBoardElement', ['on'])

  beforeEach(function(){
    game = new Game({
      backend: fakeBackend,
      renderer: fakeRenderer,
      boardElement: fakeBoardElement
    });
  })

  it('start itself by posting to server', function(){
    var formData = {game_type: 'blah', board_size: 'blahblah'}
    game.start(formData)
    expect(fakeBackend.startGame).toHaveBeenCalledWith(formData, game, game.update);
  })

  it('binds events when starting', function(){
    game.start({}) 
    expect(fakeBoardElement.on).toHaveBeenCalled()
  })

  it('posts moves to server', function(){
    game.makeMove(0);
    expect(fakeBackend.postMove).toHaveBeenCalledWith(0, game, game.update);
  })

  it('updates board from response', function(){
    var fakeResponse = {
      board: [" ", " ", "X", " ", " ", " ", " ", " ", " "],
    };

    game.update(fakeResponse);
    expect(game.board[2]).toEqual('X')
  })

  it('draws the new board on update', function(){
    var fakeResponse = {
      board: ["X", "X", "X", " ", " ", " ", " ", " ", " "],
    };

    fakeRenderer.draw.calls.reset()
    game.update(fakeResponse);
    expect(fakeRenderer.draw).toHaveBeenCalledWith(fakeResponse.board, game.boardElement)
  })

  it('makes computer move if computer turn on update', function(){
    var fakeResponse = {
      player_type: 'computer'
    };

    spyOn(game, 'makeMove')
    game.update(fakeResponse);
    expect(game.makeMove).toHaveBeenCalled
  })
})
