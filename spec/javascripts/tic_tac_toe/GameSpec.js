describe('game', function(){


  beforeEach(function(){
    this.game = new Game({
      board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      currentPlayer: "X",
      currentPlayerType: "human",
      winner: null
    })
  })

  it('makes a move', function(){
    this.game.makeMove(2);
    
    expect(this.game.board[2]).toEqual('X');
  })

  it('sets current player', function(){
    this.game.makeMove(2);
    
    expect(this.game.currentPlayer).toEqual('O');
  })

  it('sets current player type', function(){
    this.game.makeMove(2);
    
    expect(this.game.currentPlayerType).toEqual('human');
  })
})
