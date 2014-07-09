describe('gameRenderer', function(){
  it('generates nine cells', function(){
    var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    var boardMarkup = $(GameRenderer.markupFor(board));

    var cells = boardMarkup.find('.grid-cell')
    expect(cells.length).toEqual(9);
  })

  it('generates three rows for nine cells', function(){
    var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    var boardMarkup = $(GameRenderer.markupFor(board));

    expect(boardMarkup.length).toEqual(3);
  })

  it('has player marks in generated markup', function(){
    var board = [" ", " ", "X", " ", " ", " ", " ", " ", " "]
    var boardMarkup = $(GameRenderer.markupFor(board));

    var cells = boardMarkup.find('.grid-cell')
    expect(cells[2].firstElementChild.textContent).toEqual("X")
  })

  it('can generate sixteen cells',function(){
    var board = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
    var boardMarkup = $(GameRenderer.markupFor(board));

    var cells = boardMarkup.find('.grid-cell')
    expect(cells.length).toEqual(16);
  })

  it('generates four rows for sixteen cells', function(){
    var board = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
    var boardMarkup = $(GameRenderer.markupFor(board));

    expect(boardMarkup.length).toEqual(4);
  })

  it('draws the markup on specified element', function(){
    var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    var element = $('<div id="board"><div>')

    GameRenderer.draw(board, element);
    expect(element.find('.grid-cell')).not.toBe(null)
  })
})
