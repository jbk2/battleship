export class Ship {
  static shipCounter = 0
  #size
  #hits
  #id
  
  constructor(size) {
    this.setSize(size)
    this.#hits = 0;
    this.#id = `ship-${++Ship.shipCounter}`
  }

  getId() {
    return this.#id
  }

  setSize(size) {
    this.#size = size
  }

  getSize() {
    return this.#size
  }

  hit() {
    if(this.getHits() >= this.getSize()) {
      return "cannot receive more hits than ship's size";
    }
    this.#hits += 1;
  }

  getHits() {
    return this.#hits
  }

  isSunk() {
    return this.getHits() === this.getSize();
  }
}