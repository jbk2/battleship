import { Board } from "./board.js";
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

  playGame() {
    // ui signify humans turn
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

