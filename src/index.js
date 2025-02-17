import './assets/stylesheets/styles.css'
// import { Board } from './components/board.js'
import { Player } from './components/player.js'
import { UIController } from './ui/ui-controller.js'

document.addEventListener("DOMContentLoaded", () => {
})

function init() {
  // create two players
  const humanPlayer = new Player('human');
  const computerPlayer = new Player('computer');
  // populate their boards
  const humansBoard = humanPlayer.getBoard()
  const computersBoard = computerPlayer.getBoard()
  humansBoard.populateBoard()
  computersBoard.populateBoard()
  // display boards
  UIController.displayBoard(humansBoard, 'human')
  UIController.displayBoard(computersBoard, 'computer')
  // commence game
  // - add event listeners to computer board:
  // UIController.addComputerBoardListeners(computersBoard)
    // - display turn
    // - enable turn
    // - calculate winner
    // - change turn if no win
}

init();