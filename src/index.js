import './assets/stylesheets/styles.css'
import { Player } from './components/player.js'
import { UIController } from './ui/ui-controller.js'
import { Game } from './components/game.js'
import _fleet_grid  from './views/partials/_fleet_grid.html'

document.addEventListener("DOMContentLoaded", () => {
  const humanFleet = document.getElementById('human-fleet');
  const computerFleet = document.getElementById('computer-fleet');
  humanFleet.insertAdjacentHTML('beforeend', _fleet_grid)
  computerFleet.insertAdjacentHTML('beforeend', _fleet_grid)
})

function init() {
  const game = new Game();
  const humansBoard = game.getHumanPlayer().getBoard();
  const computersBoard = game.getComputerPlayer().getBoard();
  UIController.displayBoard(game, humansBoard, 'human')
  UIController.displayBoard(game, computersBoard, 'computer')
  // UIController.displayTurn(this.getActivePlayer())
  game.startGame()
}

// function setUp() {
  // const game = new Game()
  // commence game
  // - add event listeners to computer board:
  // UIController.addComputerBoardListeners(computersBoard)
    // - display turn
    // - enable turn
    // - calculate winner
    // - change turn if no win
// }

init();