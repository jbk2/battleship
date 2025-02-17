import { Board } from './board.js'

export class Player {
  #type
  #board

  constructor(type) {
    this.setType(type);
    this.setBoard()

  }

  setType(type) {
    const types = ['human', 'computer']
    if(types.includes(type)) {
      this.#type = type
    } else {
      throw new Error("type must be either 'human' or 'computer'");
    }
  }

  getType() {
    return this.#type
  }

  setBoard() {
    this.#board = new Board()
  }

  getBoard() {
    return this.#board
  }
}