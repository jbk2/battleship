import _board from '../views/partials/_board.html'

export class UIController {
  static displayBoard(board, boardType) {
    const [hit, miss, ship] = ['💥', '🌊', '🛳️'];
    const boardElement = document.getElementById(`${boardType}s-board`);
    
    boardElement.innerHTML = '';
    boardElement.insertAdjacentHTML('beforeend', _board);
    boardElement.querySelector('.board-title').innerText = `${boardType} player's board`
    const grid = board.getGrid();

    for(let row in grid) {
      for(let col in grid[row]) {
        const gridCell = grid[row][col];
        const uiCell = boardElement.querySelector(`#row-${row} > .col-${col}`)

        if(!gridCell.attacked && gridCell.shipId && boardType === 'human') {
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
    if(boardType === 'computer') {
      UIController.addComputerBoardListeners(board);
    };
  }

  static addComputerBoardListeners(board) {
    const grid = board.getGrid();

    for(let row in grid) {
      for(let col in grid[row]) {
        const cellEl = document.querySelector(`#computers-board #row-${row} > .col-${col}`)
        
        cellEl.addEventListener('mouseover', () => {
          cellEl.style.backgroundColor = 'lightpink';
        })
        cellEl.addEventListener('mouseout', () => {
          cellEl.style.backgroundColor = '';
        })
        cellEl.addEventListener('click', () => {
          try {
            console.log("attacking", `${row}${col}`)
            board.receiveAttack(`${row}${col}`);
            UIController.displayBoard(board, 'computer')
            console.log(board.getGrid())
          } catch (error) {
            alert(error);
          }
        })
      }
    }
  } 
}