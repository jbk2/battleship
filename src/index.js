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
  humanPlayer.getBoard().populateBoard()
  computerPlayer.getBoard().populateBoard()
  // display boards
  UIController.displayBoard(humanPlayer.getBoard(), 'human')
  UIController.displayBoard(computerPlayer.getBoard(), 'computer')
  // commence game
    // - display turn
    // - enable turn
    // - calculate winner
    // - change turn if no win
}

init();