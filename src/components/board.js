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

  placeShip(ship, startCell, endCell) {
    if(this.outOfGrid(startCell) || this.outOfGrid(endCell)) {
      throw new Error(`Can't place ship: ${startCell} - ${endCell} is out of grid`);
    }
    const shipsCells = this.allShipsCells(startCell, endCell)
    if(!this.cellsEmpty) { throw new Error(`Can't place ship as not all of its cells are empty`) }

    this.addShip(ship);
    shipsCells.forEach((cell) => {
      this.setCell(ship.getId(), cell)
    })
    // update the baords cell with the ship ID (and whether the cell has been tried by competitor yet?)
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

  allShipsCells(startCell, endCell) {
    const shipsCells = []
    const [startRow, endRow, startCol, endCol] = [this.getCellRow(startCell), this.getCellRow(endCell),
      this.getCellCol(startCell), this.getCellCol(endCell)]
    
    if(startRow === endRow) { // must be same row
      const row = startRow
      const difference = startCol - endCol
      if(difference < 0) {
        // start is the lower col
        for(let i = 0; i <= Math.abs(difference); i++ ) {
          shipsCells.push(`${row}${Number(startCol) + i}`)
        }
      }
      if(difference > 0) {
        // end is the lower col
        for(let i = 0; i <= Math.abs(difference); i++ ) {
          shipsCells.push(`${row}${Number(endCol) + i}`)
        }
      }
    } 
    else if (startCol === endCol) { // must be vertically laid
      const column = startCol
      const difference = startRow.charCodeAt(0) - endRow.charCodeAt(0)

      if(difference < 0) {
        // start is lower row
        for(let i = 0; i <= Math.abs(difference); i++) {
          shipsCells.push(`${String.fromCharCode(startRow.charCodeAt(0) + i)}${column}`)
        }
      }
      if(difference > 0) {
        // end is the lower row
        for(let i = 0; i <= Math.abs(difference); i++) {
          shipsCells.push(`${String.fromCharCode(endRow.charCodeAt(0) + i)}${column}`)
        }
      }
    }
    return shipsCells
  }

  outOfGrid(cell) {
    const row = this.getCellRow(cell)
    const col = this.getCellCol(cell)
    
    if(row.charCodeAt(0) < 'a'.charCodeAt(0) || row.charCodeAt(0) > 'j'.charCodeAt(0)) {
      return true
    }
    if(col < 1 || col > 10) {
      return true
    }
    return false
  }

  cellsEmpty(cells) {
    for(const cell of cells) {
      const row = this.getCellRow(cell)
      const col = this.getCellCol(cell)
      if(this.#grid[row][col] != null) {
        return false
      }
    }
    return true
  }

  getCellRow(cell) {
    return cell[0]
  }

  getCellCol(cell) {
    return cell.match(/\d+/g)[0]
  }
}