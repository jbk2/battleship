export class GridHelper {
  static placementCells(startCell, endCell) {
  const shipsCells = []
  const [startRow, endRow, startCol, endCol] = [GridHelper.getCellRow(startCell), GridHelper.getCellRow(endCell),
    GridHelper.getCellCol(startCell), GridHelper.getCellCol(endCell)]
    
    if(startRow === endRow) { // horizontal placement
      for(let col = Math.min(startCol, endCol); col <= Math.max(startCol, endCol); col++) {
        shipsCells.push(`${startRow}${col}`)
      }
    } else if (startCol === endCol) { //verticalPlacement
      for(let row = Math.min(startRow.charCodeAt(0), endRow.charCodeAt(0));
      row <= Math.max(startRow.charCodeAt(0), endRow.charCodeAt(0));
      row++) {
        shipsCells.push(`${String.fromCharCode(row)}${startCol}`)
      }
    }
    return shipsCells
  }

  static validPlacement(grid, ship, startCell, endCell) {
    const errors = {
      diagonal: `Can't place ship: ${startCell} - ${endCell} is diagonal positioning`,
      outOfBounds: `Can't place ship: ${startCell} - ${endCell} is out of bounds`,
      sizeMismatch: `Cell placement size does not equal ship size`,
      occupied: `Can't place ship as not all of its cells are empty`
    };

    if(GridHelper.diagonal(startCell, endCell)) { throw new Error(errors.diagonal) }

    if(GridHelper.outOfBounds(startCell) || GridHelper.outOfBounds(endCell)) {
      throw new Error(errors.outOfBounds);
    }

    const placementCells = GridHelper.placementCells(startCell, endCell)

    if(ship.getSize() != placementCells.length) { throw new Error(errors.sizeMismatch) }

    if(GridHelper.occupied(placementCells, grid)) {
      throw new Error(errors.occupied) }

    return true
  }
    
  static outOfBounds(cell) {
    const row = GridHelper.getCellRow(cell)
    const col = GridHelper.getCellCol(cell)
    
    if(row.charCodeAt(0) < 'a'.charCodeAt(0) || row.charCodeAt(0) > 'j'.charCodeAt(0)) {
      return true
    }
    if(col < 1 || col > 10) {
      return true
    }
    return false
  }

  static diagonal(startCell, endCell) {
    const [startRow, endRow, startCol, endCol] = [GridHelper.getCellRow(startCell), GridHelper.getCellRow(endCell),
      GridHelper.getCellCol(startCell), GridHelper.getCellCol(endCell)]
    return startRow !== endRow && startCol !== endCol 
  }
  
  static occupied(cells, grid) {
    for(const cell of cells) {
      const row = GridHelper.getCellRow(cell)
      const col = GridHelper.getCellCol(cell)
      if(grid[row][col] != null) {
        return true
      }
    }
    return false
  }
    
  static getCellRow(cell) {
    return cell[0]
  }
  
  static getCellCol(cell) {
    return cell.match(/\d+/g)[0]
  }
  }