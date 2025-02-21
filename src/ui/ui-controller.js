import _board from '../views/partials/_board.html'
import _fleet_grid  from '../views/partials/_fleet_grid.html'

export class UIController {
  static computerBoardListeners = new Map();

  static displayBoard(game, board, playerType) {
    const [hit, miss, ship] = ['💥', '🌊', '🛳️'];
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
    const titleString = `${capitalize(playerType)} player's board`
    const boardElement = document.getElementById(`${playerType}-board`);
    
    boardElement.innerHTML = '';
    boardElement.insertAdjacentHTML('beforeend', _board);
    UIController.displayFleet(board, playerType);
    boardElement.querySelector('.board-title').innerText = titleString;
    const grid = board.getGrid();

    for(let row in grid) {
      for(let col in grid[row]) {
        const gridCell = grid[row][col];
        const uiCell = boardElement.querySelector(`.row-${row} > .col-${col}`)


        if (gridCell.attacked) {
          if (gridCell.shipId) {
            const ship = board.getShip(gridCell.shipId)
            if (ship.isSunk()) { uiCell.classList.add('sunk'); }
            uiCell.innerText = hit;
          } else {
            uiCell.innerText = miss;
          }
        } else {
          if (!gridCell.attacked && gridCell.shipId && playerType === 'human') {
            uiCell.innerText = ship;
          }
        }
      }
    }
  }

  static addComputerBoardListeners(game, computerBoard) {
    const grid = computerBoard.getGrid();

    for(let row in grid) {
      for(let col in grid[row]) {
        if(grid[row][col].attacked === true) continue;

        const cellEl = document.querySelector(`#computer-board .row-${row} > .col-${col}`)
        const cellKey = `${row}${col}`
        const handleMouseOver = (event) => {
          cellEl.style.backgroundColor = 'lightpink';
        }
        const handleMouseOut = (event) => {
          cellEl.style.backgroundColor = '';
        }
        const handleClick = (event) => {
          try {
            console.log("attacking", cellKey)
            game.processMove('human', cellKey)
          } catch (error) {
            console.log(error);
          }
        }
        
        cellEl.addEventListener('mouseover', handleMouseOver);
        cellEl.addEventListener('mouseout', handleMouseOut);
        cellEl.addEventListener('click', handleClick);
    
        UIController.computerBoardListeners.set(cellKey, {
          cell: cellEl,
          handleMouseOver,
          handleMouseOut,
          handleClick
        });

      }
    }
  }

  static removeComputerBoardListeners(computerBoard) {
    UIController.computerBoardListeners.forEach((listenerObj, cellKey) => {
      const { cell, handleMouseOver, handleMouseOut, handleClick } = listenerObj;
      cell.removeEventListener('mouseover', handleMouseOver);
      cell.removeEventListener('mouseout', handleMouseOut);
      cell.removeEventListener('click', handleClick);
    })
    UIController.computerBoardListeners.clear();
  }

  static displayTurn(player) {
    const dialogueEl = document.querySelector('section#dialogue > div > p');
    dialogueEl.innerText = `${player}'s turn...`;
  }

  static displayWin(winner) {
    const dialogueEl = document.querySelector('section#dialogue > div > p');
    dialogueEl.innerText = `${winner}'s won!!! Congratulations`;
  }

  static displayFleet(board, playerType) {
    const playerBoardHeader = document.querySelector(`#${playerType}-board .board-header`)
    playerBoardHeader.insertAdjacentHTML('beforeend', _fleet_grid)
    const ships = Object.values(board.getShips());
   
    ships.forEach(ship => {
      const type = ship.getType();
      const fleetShipEls = document.querySelectorAll(`#${playerType}-board .${type}`)
      const hits = ship.getHits()
   
      for(let i = 0; i < hits; i++) {
        fleetShipEls[i].classList.add('hit');
      }
    })
  }
}