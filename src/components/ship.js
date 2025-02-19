export class Ship {
  static shipCounter = 0
  #id
  #size
  #type
  #hits

  static shipDefinitions =  { carrier: { size: 5 },
    battleship: { size: 4 },
    cruiser: { size: 3 },
    submarine: { size: 3 },
    destroyer: { size: 2 }
  };
  
  constructor(type) {
    this.setTypeAndSize(type)
    this.#hits = 0;
    this.#id = `ship-${++Ship.shipCounter}`
  }

  getId() {
    return this.#id
  }
  
  getType() {
    return this.#type
  }

  getSize() {
    return this.#size
  }
  
  setTypeAndSize(type) {
    if(!(type in Ship.shipDefinitions)) { throw new Error('type does not exist')};
    const size = Ship.shipDefinitions[type].size
    this.#type = type
    this.#size = size
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