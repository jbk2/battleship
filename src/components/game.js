import { UIController } from "../ui/ui-controller.js";
import { Board } from "./board.js";
import { GridHelper } from "./helpers/gridHelper.js";
import { Player } from "./player.js";

export class Game {
  #activePlayer
  #humanPlayer
  #computerPlayer

  constructor() {
    this.setActivePlayer('human');
    this.setPlayers()
  }
  
  setPlayers() {
    this.#humanPlayer = new Player('human');
    this.#computerPlayer = new Player('computer');
    // populate their boards
    const humansBoard = this.getHumanPlayer().getBoard()
    const computersBoard = this.getComputerPlayer().getBoard()
    humansBoard.populateBoard()
    computersBoard.populateBoard()
  }

  setActivePlayer(player) {
    if(player != 'human' && player != 'computer') {
      throw new Error("player must be of type 'human' or 'computer'");
    }
    this.#activePlayer = player;
  }

  getActivePlayer() {
    return this.#activePlayer;
  }
  
  toggleActivePlayer() {
    this.#activePlayer = this.#activePlayer === 'human' ? 'computer' : 'human';
  }

  getHumanPlayer() {
    return this.#humanPlayer
  }

  getComputerPlayer() {
    return this.#computerPlayer
  }

  processMove(playerType, cell = null) {
    if(this.getActivePlayer() != playerType) {
      throw new Error(`activePlayer is '${this.getActivePlayer()}', activePlayer must be '${playerType}' for a '${playerType}' to attack`)
    }
    const playersBoard = playerType === 'human' ? this.getComputerPlayer().getBoard() : this.getHumanPlayer().getBoard();

    try {
      console.log(`processing ${playerType} move`)
      if(playerType === 'computer' && cell === null) {
        cell = GridHelper.getRandomCell();
      }
      playersBoard.receiveAttack(cell)
      UIController.displayBoard(this, playersBoard, playerType)
      if(this.checkWin(playersBoard)) { return `${playerType} wins` }
      this.toggleActivePlayer();
      // if playerType === humanMove then remove computer cell event listeners
      UIController.displayTurn(this.getActivePlayer())
      if(this.getActivePlayer() === 'computer') {
        setTimeout(() => this.processMove('computer', null), 500);
      }
      return null;
    } catch(error) {
      console.log(`was an error trying to call #receiveAttack(${cell})`, error)
      throw error;
    }
  }

  // if true this needs to update UI, stop game, offer re-game
  checkWin(board) {
    return board.fleetSunk()
  }

  startGame() {
    // ui signify humans turn:
    UIController.displayTurn(this.getActivePlayer())
      // place attack
      // evaluate win
        // if win notify ui, stop game (remove computer baord event listeners)
        // if no win
      // ui signify computers turn, temporarily remove computer baord event listeners.
      // make computer move
      // place attack
      // evaluate win
  }
}

