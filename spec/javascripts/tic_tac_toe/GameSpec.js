describe('game', function(){
  var game;


  beforeEach(function(){
    game = new Game({
      board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      current_player: "X",
      player_type: "human",
      winner: null,
      over: false
    });
  })

  it('updates its attributes', function(){
    var fakeResponse = {
      board: ["X", "X", "X", " ", " ", " ", " ", " ", " "],
      current_player: "O",
      player_type: "human",
      winner: "X",
      over: true
    };

    game.update(fakeResponse);

    expect(game.board[0]).toEqual("X")
    expect(game.currentPlayer).toEqual("O")
    expect(game.currentPlayerType).toEqual("human")
    expect(game.winner).toEqual("X")
    expect(game.over).toBe(true)
  })

  it('draws nine cells', function(){
    var fakeResponse = {
      board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    };
    game.update(fakeResponse);
    var boardMarkup = $(game.draw());

    var cells = boardMarkup.find('.grid-cell')
    expect(cells.length).toEqual(9);
  })

  it('draws three rows for nine cells', function(){
    var fakeResponse = {
      board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    };
    game.update(fakeResponse);
    var boardMarkup = $(game.draw());

    var rows = boardMarkup.find('.grid-row')
    expect(rows.length).toEqual(3);
  })

  it('draws marks', function(){
    var fakeResponse = {
      board: [" ", " ", "X", " ", " ", " ", " ", " ", " "],
    };
    game.update(fakeResponse);
    var boardMarkup = $(game.draw());

    var cells = boardMarkup.find('.grid-cell')
    expect(cells[2].firstElementChild.textContent).toEqual("X")
  })

  it('can draw sixteen cells',function(){
    var fakeResponse = {
      board: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
    };
    game.update(fakeResponse);

    var boardMarkup = $(game.draw());

    var cells = boardMarkup.find('.grid-cell')
    expect(cells.length).toEqual(16);
  })

})
