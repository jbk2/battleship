import { Board } from "./board.js";

// instantiate:
  // - Board
  // - Player
// place ships

export class Game {
  #activePlayer

  constructor() {
    this.setActivePlayer('human');
  }

  setActivePlayer(player) {
    if(player != 'human' || player != 'computer') {
      throw new Error("player must be of type 'human' or 'computer'");
    }
    this.#activePlayer = player;
  }

  getActivePlayer() {
    return this.#activePlayer;
  }

  toggleActivePlayer() {
    
  }
}

