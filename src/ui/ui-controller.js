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
      computersBoard.innerHTML = '';
      computersBoard.insertAdjacentHTML('beforeend', _board)
      // const newBoardWrapper = document.createElement('div');
      // newBoardWrapper.innerHTML = _board;

      // const newBoard = newBoardWrapper.firstElementChild;
      // computersBoard.replaceWith(newBoard);
      // computersBoard = newBoard
      
      // if(!computersBoard) {
      //   console.error("computersBoard not found after replaceWith()");
      //   return;
      // }
      
      computersBoard.querySelector('.board-title').innerText = "Computer player's board"
      console.log(computersBoard.querySelector('.board-title').innerText);
      
      const grid = board.getGrid()

      for(let row in grid) {
        for(let col in grid[row]) {
          const gridCell = grid[row][col];
          const uiCell = computersBoard.querySelector(`#row-${row} > td.col-${col}`)

          // uiCell.replaceWith(uiCell.cloneNode(true));
          // const updatedUICell = computersBoard.querySelector(`#row-${row} > td.col-${col}`);
          // console.log(updatedUICell)

          uiCell.addEventListener('mouseover', () => {
            uiCell.style.backgroundColor = 'lightpink';
          })
          uiCell.addEventListener('mouseout', () => {
            uiCell.style.backgroundColor = '';
          })
          uiCell.addEventListener('click', () => {
            console.log("attacking", `${row}${col}`)
            board.receiveAttack(`${row}${col}`);
            UIController.displayBoard(board, 'computer')
            console.log(board.getGrid())
          })
        
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