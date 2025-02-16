import { GridHelper } from './helpers/gridHelper.js'

export class Board {
  #grid
  #ships = {}
  
  constructor() {
    this.setGrid()
  }

  setGrid() {
    this.#grid = {}
    const rows = "abcdefghij".split("");
    const cols = Array.from( { length: 10 } , (_, i) => (i + 1).toString())

    rows.forEach(row => {
      this.#grid[row] = {};
      
      cols.forEach(col => {
        this.#grid[row][col] = null
      })
    })
  }

  getGrid() {
    return this.#grid
  }

  setCell(shipId, cell) {
    this.#grid[cell[0]][cell[1]] = {
      'shipId': shipId
    }
  }

  getCell(cell) {
    const y = cell[0]
    const x = cell[1]
    return this.#grid[y][x]
  }

  // shipManager?
  placeShip(ship, startCell, endCell) {
    const errors = {
      diagonal: `Can't place ship: ${startCell} - ${endCell} is diagonal positioning`,
      outOfBounds: `Can't place ship: ${startCell} - ${endCell} is out of grid`,
      sizeMismatch: `Cell placement size does not equal ship size`,
      occupied: `Can't place ship as not all of its cells are empty`
    };

    if(GridHelper.diagonal(startCell, endCell)) { throw new Error(errors.diagonal) }

    if(GridHelper.outOfBounds(startCell) || GridHelper.outOfBounds(endCell)) {
      throw new Error(errors.outOfBounds);
    }
    
    const shipsCells = GridHelper.allShipsCells(startCell, endCell)

    if(ship.getSize() != shipsCells.length) { throw new Error(errors.sizeMismatch) }

    if(GridHelper.occupied(shipsCells, this.getGrid())) {
      throw new Error(errors.occupied) }

    this.addShip(ship);
    shipsCells.forEach((cell) => {
      this.setCell(ship.getId(), cell)
    })
    // update the boards cell with the ship ID
    // (and whether the cell has been tried by competitor yet?)
  }

  addShip(ship) {
    this.#ships[ship.getId()] = ship
  }

  getShips() {
    return this.#ships
  }

  getShip(id) {
    return this.#ships[id]
  }

}