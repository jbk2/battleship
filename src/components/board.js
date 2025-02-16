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
        this.#grid[row][col] = { shipId: null, attacked: null }
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

  addShip(ship) {
    this.#ships[ship.getId()] = ship
  }

  getShips() {
    return this.#ships
  }

  getShip(id) {
    return this.#ships[id]
  }

  // shipManager?
  placeShip(ship, startCell, endCell) {
    try {
      const placementCells = GridHelper.placementCells(startCell, endCell)
      GridHelper.validPlacement(this.getGrid(), ship, startCell, endCell)
      this.addShip(ship);
      placementCells.forEach((cell) => {
        this.setCell(ship.getId(), cell)
      })
      return { success: true, message: `Ship placed between ${startCell}-${endCell}`}
    } catch (error) {
      return  {success: false, message: error.message }
    }
    // update the boards cell with the ship ID
    // (and whether the cell has been tried by competitor yet?)
  }

  // receiveAttack() {

  // }
}