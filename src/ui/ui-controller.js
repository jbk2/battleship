import _board from '../views/partials/_board.html'
import { Game } from '../components/game.js'

export class UIController {
  static displayBoard(game, board, boardType) {
    const [hit, miss, ship] = ['💥', '🌊', '🛳️'];
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
    const titleString = `${capitalize(boardType)} player's board`
    const boardElement = document.getElementById(`${boardType}s-board`);
    
    boardElement.innerHTML = '';
    boardElement.insertAdjacentHTML('beforeend', _board);
    boardElement.querySelector('.board-title').innerText = titleString;
    if(boardType === 'human') {
      boardElement.querySelector('.board-title').style.textAlign = 'left';
      boardElement.querySelector('.board-title').style.marginLeft = '2.6rem';
    } else {
      boardElement.querySelector('.board-title').style.textAlign = 'right';
    }
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
        if(gridCell.attacked && gridCell.shipId) {
          const ship = board.getShip(gridCell.shipId)
          if(ship.isSunk()) {
            uiCell.classList.add('sunk');
          }
        }
      }
    }
    if(boardType === 'computer') {
      UIController.addComputerBoardListeners(game, board);
    };
  }

  static addComputerBoardListeners(game, board) {
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
            game.processHumanMove(`${row}${col}`)
            // UIController.displayBoard(game, board, 'computer')
          } catch (error) {
            console.log(error);
          }
        })
      }
    }
  }

  static updateCell() {

  }

  static displayTurn(player) {
    const dialogueEl = document.querySelector('section#dialogue > div > p');
    dialogueEl.innerText = `${player}'s turn...`;
    console.log("DIALOG EL HERE ==>>", dialogueEl)
    console.log("PLAYER HERE ==>>", player)
  }

  static displayWin(winner) {

  }
}