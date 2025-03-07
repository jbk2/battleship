import { GridHelper } from '../components/helpers/gridHelper.js'
import { Board } from '../components/board.js'
import { Ship } from '../components/ship.js'

describe("placementCells", () => {
  
  describe("for a ship laid vertically", () => {
    const board = new Board()
    describe("for a ship of size 5 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('a1', 'e1')
        expect(cells).toEqual(['a1', 'b1', 'c1', 'd1', 'e1'])
      })
    })
    describe("for a ship of size 3 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('a1', 'c1')
        expect(cells).toEqual(['a1', 'b1', 'c1'])
      })
    })
    describe("for a ship of size 1 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('a1', 'b1')
        expect(cells).toEqual(['a1', 'b1'])
      })
    })
    describe("for a ship of size 5 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('e4', 'a4')
        expect(cells).toEqual(['a4', 'b4', 'c4', 'd4', 'e4'])
      })
    })
    describe("for a ship of size 3 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('c9', 'a9')
        expect(cells).toEqual(['a9', 'b9', 'c9'])
      })
    })
    describe("for a ship of size 1 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('b10', 'a10')
        expect(cells).toEqual(['a10', 'b10'])
      })
    })
  })
  
  describe("for a ship laid horizontally", () => {
    describe("for a ship of size 5 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('a1', 'a5')
        expect(cells).toEqual(['a1', 'a2', 'a3', 'a4', 'a5'])
      })
    })
    describe("for a ship of size 3 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('a1', 'a3')
        expect(cells).toEqual(['a1', 'a2', 'a3'])
      })
    })
    describe("for a ship of size 2 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('a1', 'a2')
        expect(cells).toEqual(['a1', 'a2'])
      })
    })
    describe("for a ship of size 5 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('e5', 'e1')
        expect(cells).toEqual(['e1', 'e2', 'e3', 'e4', 'e5'])
      })
    })
    describe("for a ship of size 3 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('b3', 'b1')
        expect(cells).toEqual(['b1', 'b2', 'b3'])
      })
    })
    describe("for a ship of size 2 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.placementCells('j2', 'j1')
        expect(cells).toEqual(['j1', 'j2'])
      })
    })
  })

    
  describe("getCellRow()", () => {
    const board = new Board()
    it("returns the correct row id as a string", () => {
      expect(GridHelper.getCellRow('a1')).toEqual('a');
    })
  })
  
  describe("getCellCol()", () => {
    const board = new Board()
    it("returns the correct row id as a string", () => {
      expect(GridHelper.getCellCol('a1')).toEqual('1');
    })
    
    it("returns the correct row id as a string", () => {
      expect(GridHelper.getCellCol('a10')).toEqual('10');
    })
  })

  describe("outOfBounds", () => {
    const board = new Board()
    it("an in grid cell returns false", () => {
      expect(GridHelper.outOfBounds('a1')).toBe(false)
      expect(GridHelper.outOfBounds('a10')).toBe(false)
      expect(GridHelper.outOfBounds('j1')).toBe(false)
      expect(GridHelper.outOfBounds('j10')).toBe(false)
    })
    
    it("an out grid cell returns true", () => {
      expect(GridHelper.outOfBounds('k1')).toBe(true)
      expect(GridHelper.outOfBounds('k10')).toBe(true)
      expect(GridHelper.outOfBounds('z1')).toBe(true)
      expect(GridHelper.outOfBounds('z11')).toBe(true)
    })
  })

  describe("occupied()", () => {
    const board = new Board()
    const carrier = new Ship('carrier')
    board.placeShip(carrier, 'a1', 'a5')
    const occupiedCells = ['a1', 'a2', 'a3']
    const unOccupiedCells = ['b1', 'b2', 'b3']

    it("returns true if all board cells are empty", () => {
      expect(GridHelper.occupied(unOccupiedCells, board.getGrid())).toBe(false)
    })
    it("returns false if any cells are occupied", () => {
      expect(GridHelper.occupied(occupiedCells, board.getGrid())).toBe(true)
    })
  })

  describe("diagonal()", () => {
    it("returns true if given diagonal cells", () => {
      expect(GridHelper.diagonal('j10', 'h8')).toBe(true);
    })
    
    it("returns false if given vertical or horizontal cells", () => {
      expect(GridHelper.diagonal('j10', 'j8')).toBe(false);
    })
  })

  describe("getEmptyCells()", () => {
    const board = new Board()
    const carrier = new Ship('carrier')
    const battleship = new Ship('battleship')
    const cruiser = new Ship('cruiser')
    board.placeShip(carrier, 'a1', 'a5')
    board.placeShip(battleship, 'c7', 'c10')
    board.placeShip(cruiser, 'j1', 'h1')
    
    it("returns an array of all empty cells", () => {
      expect(GridHelper.getEmptyCells(board.getGrid()).length).toBe(88);
      const submarine = new Ship('submarine')
      board.placeShip(submarine, 'e1', 'e3')
      expect(GridHelper.getEmptyCells(board.getGrid()).length).toBe(85);
    })
  })

  describe("getRandomCell()", () => {
    const randCell = GridHelper.getRandomCell()
    expect(randCell[0]).toMatch(/[a-j]/)
    const withinRange = randCell.slice(1) >= 1 && randCell.slice(1) <= 10
    expect(withinRange).toBe(true)
  })

  describe("getShipsCells", () => {
    const board = new Board()
    const carrier = new Ship('carrier')
    board.placeShip(carrier, 'a1', 'a5')
    const carrierId = carrier.getId()
    const battleship = new Ship('battleship')
    board.placeShip(battleship, 'c7', 'c10')
    const battleshipId = battleship.getId()
    const cruiser = new Ship('cruiser')
    board.placeShip(cruiser, 'j1', 'h1')
    const cruiserId = cruiser.getId()

    it("should return an array of the cells that the ship occupies", () => {
      expect(GridHelper.getShipsCells(board.getGrid(), carrierId)).toEqual(['a1', 'a2', 'a3', 'a4', 'a5'])
      expect(GridHelper.getShipsCells(board.getGrid(), battleshipId)).toEqual(['c7', 'c8', 'c9', 'c10'])
      expect(GridHelper.getShipsCells(board.getGrid(), cruiserId)).toEqual(['h1', 'i1', 'j1'])
    })
  })

  describe('attackedAlready()', () => {
    const newBoard = new Board;
    const carrier = new Ship('carrier');
    newBoard.placeShip(carrier, 'a1', 'a5');
    newBoard.receiveAttack('a1');
    
    it('returns false for an unattacked cell', () => {
      expect(GridHelper.attackedAlready(newBoard, 'a2')).toBe(false);
    });
    
    it('returns true for an attacked cell', () => {
      expect(GridHelper.attackedAlready(newBoard, 'a1')).toBe(true);
    });
  })
})