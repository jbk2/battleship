import { Board } from '../components/board.js'
import { Ship } from '../components/ship.js'

describe('Board', () => {
  describe("grid instantiation", () => {
    xit("instantiates a 10x10 grid object with a-j row keys and 1-10 col keys", () => {
      const newBoard = new Board()
      const grid = newBoard.getGrid()
  
      expect(Object.keys(grid).length).toBe(10)
      Object.keys(grid).forEach(row => {
        expect(Object.keys(grid[row]).length).toBe(10)
        Object.keys(grid[row]).forEach(col => {
          expect(grid[row][col]).toBeNull();
        })
      })
    })
  })

  describe("placeShip()", () => {
    const board = new Board()
    const carrier = new Ship(5)
    board.placeShip(carrier, 'a1', 'a5')

    it("will store the ship and its ID in #ships", () => {
      expect(board.getShip(carrier.getId())).toEqual(carrier)
    })
    
    it("can place a ship if cells are unoccupied", () => {
      // console.log(board.getGrid())
      expect(board.getCell('a1')).not.toBeNull()
      expect(board.getCell('a1')).toEqual({ 'shipId': carrier.getId() })
      expect(board.getCell('a2')).not.toBeNull()
      expect(board.getCell('a3')).not.toBeNull()
      expect(board.getCell('a4')).not.toBeNull()
      expect(board.getCell('a5')).not.toBeNull()
      expect(board.getCell('a6')).toBeNull()
    })

    // it("will not place a ship if cells are occupied", () => {
    // })

  })

  describe("allShipsCells", () => {
    const board = new Board()
    
    describe("for a ship laid vertically", () => {
      describe("for a ship of size 5 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('a1', 'e1')
          expect(cells).toEqual(['a1', 'b1', 'c1', 'd1', 'e1'])
        })
      })
      describe("for a ship of size 3 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('a1', 'c1')
          expect(cells).toEqual(['a1', 'b1', 'c1'])
        })
      })
      describe("for a ship of size 1 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('a1', 'b1')
          expect(cells).toEqual(['a1', 'b1'])
        })
      })
      describe("for a ship of size 5 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('e4', 'a4')
          expect(cells).toEqual(['a4', 'b4', 'c4', 'd4', 'e4'])
        })
      })
      describe("for a ship of size 3 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('c9', 'a9')
          expect(cells).toEqual(['a9', 'b9', 'c9'])
        })
      })
      describe("for a ship of size 1 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('b10', 'a10')
          expect(cells).toEqual(['a10', 'b10'])
        })
      })
    })
    
    describe("for a ship laid horizontally", () => {
      describe("for a ship of size 5 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('a1', 'a5')
          expect(cells).toEqual(['a1', 'a2', 'a3', 'a4', 'a5'])
        })
      })
      describe("for a ship of size 3 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('a1', 'a3')
          expect(cells).toEqual(['a1', 'a2', 'a3'])
        })
      })
      describe("for a ship of size 2 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('a1', 'a2')
          expect(cells).toEqual(['a1', 'a2'])
        })
      })
      describe("for a ship of size 5 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('e5', 'e1')
          expect(cells).toEqual(['e1', 'e2', 'e3', 'e4', 'e5'])
        })
      })
      describe("for a ship of size 3 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('b3', 'b1')
          expect(cells).toEqual(['b1', 'b2', 'b3'])
        })
      })
      describe("for a ship of size 2 cells", () => {
        it("returns all of the cells between the two given cells", () => {
          const cells = board.allShipsCells('j2', 'j1')
          expect(cells).toEqual(['j1', 'j2'])
        })
      })
    })

  })
    
  describe("getCellRow()", () => {
    const board = new Board()
    it("returns the correct row id as a string", () => {
      expect(board.getCellRow('a1')).toEqual('a');
    })
  })
  
  describe("getCellCol()", () => {
    const board = new Board()
    it("returns the correct row id as a string", () => {
      expect(board.getCellCol('a1')).toEqual('1');
    })
    
    it("returns the correct row id as a string", () => {
      expect(board.getCellCol('a10')).toEqual('10');
    })
  })

})