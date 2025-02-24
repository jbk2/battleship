import { GridHelper } from './helpers/gridHelper.js'
import { Ship } from './ship.js'

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
        this.#grid[row][col] = { shipId: null, attacked: false }
      })
    })
  }

  getGrid() {
    return this.#grid
  }

  setCell(shipId, cell) {
    const row = cell[0]
    const col = cell.slice(1)
    this.#grid[row][col].shipId = shipId;
  }

  getCell(cell) {
    const row = cell[0]
    const col = cell.slice(1)
    return this.#grid[row][col]
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

  populateBoard() {
    const shipTypes = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']
    const ships = Array.from(shipTypes, type => new Ship(type))
    
    ships.forEach(ship => {
      let placed = false
  
      while(!placed) {
        const startCell = GridHelper.getRandomCell();
        const startRow = startCell[0]
        const startCol = Number(startCell.slice(1))
        const shipLength = ship.getSize()
        const directions = ['up', 'right', 'down', 'left']
        const direction = directions[Math.floor(Math.random() * 4)]
        let endRow, endCol

        switch (direction) {
          case 'up':
            endRow = String.fromCharCode(startRow.charCodeAt(0) - (shipLength - 1))
            endCol = startCol
            break
          case 'right':
            endRow = startRow
            endCol = startCol + (shipLength - 1)
            break
          case 'down':
            endRow = String.fromCharCode(startRow.charCodeAt(0) + (shipLength - 1))
            endCol = startCol
            break
          case 'left':
            endRow = startRow
            endCol = startCol - (shipLength - 1)
            break
        }

        const endCell = endRow + endCol.toString()
        try {
          GridHelper.validPlacement(this.getGrid(), ship, startCell, endCell)
          this.placeShip(ship, startCell, endCell)
          placed = true
        } catch (error) {
          // console.log("error found, but caught and trying to validly place a ship again", error)
        }
      }
    })
  }

  // shipManager?
  placeShip(ship, startCell, endCell) {
    try {
      GridHelper.validPlacement(this.getGrid(), ship, startCell, endCell)
      const placementCells = GridHelper.placementCells(startCell, endCell)
      this.addShip(ship);
      placementCells.forEach((cell) => {
        this.setCell(ship.getId(), cell)
      })
      return { success: true, message: `Ship placed between ${startCell}-${endCell}`}
    } catch (error) {
      // console.error(`Error placing ship ${ship.getId()} at ${startCell} - ${endCell}:`, error.message)
      throw Error(`Error placing ship ${ship.getId()} at ${startCell} - ${endCell}: ${error.message}`)
    }
    // update the boards cell with the ship ID
    // (and whether the cell has been tried by competitor yet?)
  }

  // move imrpovement methods:
  // level 1 - after a hit only select a valid neighbouring cell to the hit
  // level 2 - after a hit, if hit did not sink ship, only select a valid neighbouring cell to the hit
  // level 3 - select random valid cell with no neighbouring hits.
  getComputerMove() {
    let randCell;
    do {
      randCell = GridHelper.getRandomCell();
    } while (GridHelper.attackedAlready(this, randCell))
    return randCell
  }

  receiveAttack(cell) {
    const targetCell = this.getCell(cell)
    if(targetCell.attacked === true) throw new Error("cell has already been attacked")
    targetCell.attacked = true
    
    if(targetCell.shipId != null) {
      this.getShip(targetCell.shipId).hit()
      // and update the respective fleet element
      return { hit: true }
    } else {
      return { hit: false }
    }
  }

  removeAttack(cell) {
    const targetCell = this.getCell(cell)
    if(!targetCell || targetCell.attacked !== true) {
      throw new Error(`Either targetCell doesn't exist or it does and has not been attacked. Cell; ${cell}`)
    }
    targetCell.attacked = false;
  }

  fleetSunk() {
    return Object.values(this.getShips()).every(ship => ship.isSunk());
  }


  sinkFleet() {
    const shipsIds = Object.keys(this.getShips())
    shipsIds.forEach(shipId => {
      this.sinkShip(shipId);
    })
  }

  unSinkFirstShip() {
    const firstShip = Object.values(this.getShips())[0];
    const firstShipId = Object.keys(this.getShips())[0];
    const firstShipsFirstCell = GridHelper.getShipsCells(this.getGrid(), firstShipId)[0];
    
    firstShip.removeHit();
    this.removeAttack(firstShipsFirstCell);
    return firstShipsFirstCell;
  }

  sinkShip(shipId) {
    const shipsCells = GridHelper.getShipsCells(this.getGrid(), shipId);
    
    shipsCells.forEach(cell => {
      this.receiveAttack(cell);
    })
  }
}