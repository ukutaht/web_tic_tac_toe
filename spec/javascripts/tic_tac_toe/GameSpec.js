describe('game', function(){


  beforeEach(function(){
    this.game = new Game({
      board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      currentPlayer: "X",
      currentPlayerType: "human",
      winner: null,
      resource: new StubGameResource()
    })
  })
})
