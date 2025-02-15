import { GridHelper } from '../components/helpers/gridHelper.js'
import { Board } from '../components/board.js'
import { Ship } from '../components/ship.js'

describe("allShipsCells", () => {
  const board = new Board()
  
  describe("for a ship laid vertically", () => {
    describe("for a ship of size 5 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('a1', 'e1')
        expect(cells).toEqual(['a1', 'b1', 'c1', 'd1', 'e1'])
      })
    })
    describe("for a ship of size 3 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('a1', 'c1')
        expect(cells).toEqual(['a1', 'b1', 'c1'])
      })
    })
    describe("for a ship of size 1 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('a1', 'b1')
        expect(cells).toEqual(['a1', 'b1'])
      })
    })
    describe("for a ship of size 5 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('e4', 'a4')
        expect(cells).toEqual(['a4', 'b4', 'c4', 'd4', 'e4'])
      })
    })
    describe("for a ship of size 3 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('c9', 'a9')
        expect(cells).toEqual(['a9', 'b9', 'c9'])
      })
    })
    describe("for a ship of size 1 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('b10', 'a10')
        expect(cells).toEqual(['a10', 'b10'])
      })
    })
  })
  
  describe("for a ship laid horizontally", () => {
    describe("for a ship of size 5 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('a1', 'a5')
        expect(cells).toEqual(['a1', 'a2', 'a3', 'a4', 'a5'])
      })
    })
    describe("for a ship of size 3 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('a1', 'a3')
        expect(cells).toEqual(['a1', 'a2', 'a3'])
      })
    })
    describe("for a ship of size 2 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('a1', 'a2')
        expect(cells).toEqual(['a1', 'a2'])
      })
    })
    describe("for a ship of size 5 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('e5', 'e1')
        expect(cells).toEqual(['e1', 'e2', 'e3', 'e4', 'e5'])
      })
    })
    describe("for a ship of size 3 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('b3', 'b1')
        expect(cells).toEqual(['b1', 'b2', 'b3'])
      })
    })
    describe("for a ship of size 2 cells", () => {
      it("returns all of the cells between the two given cells", () => {
        const cells = GridHelper.allShipsCells('j2', 'j1')
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

  describe("outOfGrid", () => {
    const board = new Board()
    it("an in grid cell returns false", () => {
      expect(GridHelper.outOfGrid('a1')).toBe(false)
      expect(GridHelper.outOfGrid('k1')).toBe(true)
      expect(GridHelper.outOfGrid('a11')).toBe(true)
      expect(GridHelper.outOfGrid('z11')).toBe(true)
      expect(GridHelper.outOfGrid('z1')).toBe(true)
    })
    
    // it("an out grid cell returns true", () => {

    // })
  })

  describe("cellsEmpty()", () => {
    const board = new Board()
    const carrier = new Ship(5)
    board.placeShip(carrier, 'a1', 'a5')
    const occupiedCells = ['a1', 'a2', 'a3']
    const unOccupiedCells = ['b1', 'b2', 'b3']

    it("returns true if all board cells are empty", () => {
      expect(GridHelper.cellsEmpty(unOccupiedCells, board.getGrid())).toBe(true)
    })
    it("returns false if any cells are occupied", () => {
      expect(GridHelper.cellsEmpty(occupiedCells, board.getGrid())).toBe(false)
    })
  })

})