import _board from '../views/partials/_board.html'

export class UIController {
  static displayBoard(board, boardType) {
    const [hit, miss, ship] = ['💥', '🌊', '🛳️'];

    if(boardType === 'human') {
      const humansBoard = document.getElementById('humans-board')
      humansBoard.insertAdjacentHTML('beforeend', _board);
      humansBoard.querySelector('.board-title').innerText = "Human player's board"
      const grid = board.getGrid()

      for(let row in grid) {
        for(let col in grid[row]) {
          const gridCell = grid[row][col];
          const uiCell = humansBoard.querySelector(`#row-${row} > td.col-${col}`)
        
          if(!gridCell.attacked && gridCell.shipId) {
            uiCell.innerText = ship;
          }
          if(gridCell.attacked && gridCell.shipId) {
            uiCell.innerText = hit;
          }
          if(gridCell.attacked && !gridCell.shipId) {
            uiCell.innerText = miss;
          }
        }
      }
    } else if (boardType ===  'computer') {
      const computersBoard = document.getElementById('computers-board')
      computersBoard.insertAdjacentHTML('beforeend', _board);
      computersBoard.querySelector('.board-title').innerText = "Computer player's board"
      
      const grid = board.getGrid()
      for(let row in grid) {
        for(let col in grid[row]) {
          const gridCell = grid[row][col];
          const uiCell = computersBoard.querySelector(`#row-${row} > td.col-${col}`)
        
          if(gridCell.attacked && gridCell.shipId) {
            uiCell.innerText = hit;
          }
          if(gridCell.attacked && !gridCell.shipId) {
            uiCell.innerText = miss;
          }
        }
      }
    }
  }
}