import './assets/stylesheets/styles.css'
// import { Board } from './components/board.js'
import { Player } from './components/player.js'
import { UIController } from './ui/ui-controller.js'
import { Game } from './components/game.js'

document.addEventListener("DOMContentLoaded", () => {
})

function setUp() {
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
}

function init() {
  setUp()
  // const game = new Game()
  // commence game
  // - add event listeners to computer board:
  // UIController.addComputerBoardListeners(computersBoard)
    // - display turn
    // - enable turn
    // - calculate winner
    // - change turn if no win
}

init();