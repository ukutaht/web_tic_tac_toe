GameRenderer = {}

GameRenderer.rowTemplate = "<div class='grid-row'> <% cells.forEach(function(mark, index){ %> <div class='grid-cell' data-index='<%= row*size + index %>' > <span class='mark'><%= mark %></span> </div> <% }) %> </div>";

GameRenderer.markupFor = function(board){
  var boardString = "";
  var row = 0;
  var size = Math.sqrt(board.length)
  while(board.length != 0){
    var rowCells = board.splice(0, size)
    boardString = boardString + _.template(GameRenderer.rowTemplate, {cells: rowCells, row: row, size: size});
    row++;
  }
  return boardString;
}

GameRenderer.draw = function(board, el){
  var boardSize = Math.sqrt(board.length);
  el.html(GameRenderer.markupFor(board));
  var cellSize = 300 / boardSize
  el.find('.grid-cell').css('height', cellSize + 'px')
  el.find('.grid-cell').css('width', cellSize+ 'px')
  el.find('.grid-cell').css('line-height', cellSize + 'px')
  el.find('.grid-cell').css('font-size', (300 / boardSize + 1) + 'px')

  var margin = Math.ceil(300 / (boardSize * 10))  + 'px'
  el.find('.grid-cell').css('margin-right', margin)
  el.find('.grid-row').css('margin-bottom', margin)
  $('.game-container').css('padding', margin)
}

