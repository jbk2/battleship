import _board from '../views/partials/_board.html'
import { Game } from '../components/game.js'
import _fleet_grid  from '../views/partials/_fleet_grid.html'

export class UIController {
  static displayBoard(game, board, playerType) {
    const [hit, miss, ship] = ['💥', '🌊', '🛳️'];
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
    const titleString = `${capitalize(playerType)} player's board`
    const boardElement = document.getElementById(`${playerType}s-board`);
    
    boardElement.innerHTML = '';
    boardElement.insertAdjacentHTML('beforeend', _board);
    boardElement.querySelector('.board-title').innerText = titleString;
    const grid = board.getGrid();

    for(let row in grid) {
      for(let col in grid[row]) {
        const gridCell = grid[row][col];
        const uiCell = boardElement.querySelector(`#row-${row} > .col-${col}`)

        if(!gridCell.attacked && gridCell.shipId && playerType === 'human') {
          uiCell.innerText = ship;
        }
        if(gridCell.attacked && gridCell.shipId) {
          uiCell.innerText = hit;
          uiCell.dataset.attacked = true;
        }
        if(gridCell.attacked && !gridCell.shipId) {
          uiCell.innerText = miss;
          uiCell.dataset.attacked = true;
        }
        if(gridCell.attacked && gridCell.shipId) {
          uiCell.dataset.attacked = true;
          const ship = board.getShip(gridCell.shipId)
          if(ship.isSunk()) {
            uiCell.classList.add('sunk');
          }
        }
      }
    }
    // if(boardType === 'computer') {
    //   UIController.addComputerBoardListeners(game, board);
    // };
  }

  static addComputerBoardListeners(game, computerBoard) {
    const grid = computerBoard.getGrid();

    for(let row in grid) {
      for(let col in grid[row]) {
        const cellEl = document.querySelector(`#computers-board #row-${row} > .col-${col}`)
        
        if(cellEl.dataset.attacked) continue;
        if (cellEl.dataset.listenerAdded === "true") continue;
      
        cellEl.addEventListener('mouseover', () => {
          cellEl.style.backgroundColor = 'lightpink';
        })
        cellEl.addEventListener('mouseout', () => {
          cellEl.style.backgroundColor = '';
        })
        cellEl.addEventListener('click', (event) => {
          try {
            console.log("attacking", `${row}${col}`)
            game.processMove('human', `${row}${col}`)
            cellEl.dataset.attacked = true;
          } catch (error) {
            console.log(error);
          }
        }, { once: true });
        cellEl.dataset.listenerAdded = true;
      }
    }
  }

  static removeComputerBoardListeners(computerBoard) {

  }

  static displayTurn(player) {
    const dialogueEl = document.querySelector('section#dialogue > div > p');
    dialogueEl.innerText = `${player}'s turn...`;
    console.log("DIALOG EL HERE ==>>", dialogueEl)
    console.log("PLAYER HERE ==>>", player)
  }

  static displayWin(winner) {

  }

  static displayFleet(playerType) {
    const playerBoardHeader = document.querySelector(`#${playerType}s-board .board-header`)
    console.log(playerBoardHeader);
    playerBoardHeader.insertAdjacentHTML('beforeend', _fleet_grid)
  }
}