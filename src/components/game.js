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

  // have the computer cell even listeners trigger this move
  processHumanMove(cell) {
    if(this.getActivePlayer() === 'computer') {
      throw new Error("activePlayer is 'computer', \
          activePlayer must be 'human' for a 'human' to attack")
    }
    const computerPlayersBoard = this.getComputerPlayer().getBoard();

    try {
      computerPlayersBoard.receiveAttack(cell)
      if(this.checkWin(computerPlayersBoard)) { return "Human wins" }
      this.toggleActivePlayer();
      return null;
    } catch (error) {
      console.log(`was an error trying to call #receiveAttack(${cell})`, error)
    }
  }

  processComputerMove() {
    if(this.getActivePlayer() === 'human') {
      throw new Error("activePlayer is 'human', \
        activePlayer must be 'computer' for a 'computer' to attack");
    }
    
    let validMove = false;
    let cell;
    
    while(!validMove) {
      cell = GridHelper.getRandomCell();
      try {
        const humanPlayersBoard = this.getHumanPlayer().getBoard()
        humanPlayersBoard.receiveAttack(cell);
        if(this.checkWin(humanPlayersBoard)) { return "Computer wins" }
        this.toggleActivePlayer();
        validMove = true;
        return null
      } catch (error) {
        console.log(`error caught when processing computer move while \
          sending ${cell} attack to humans board`)
      }  
    }
  }

  // if true this needs to update UI, stop game, offer re-game
  checkWin(board) {
    return board.fleetSunk()
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

