import { Board } from '../components/board.js'
import { Ship } from '../components/ship.js'

describe('Board', () => {
  describe("grid instantiation", () => {
    it("instantiates a 10x10 grid object with a-j row keys and 1-10 col keys", () => {
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

    it("will not place ship if coords are out of grid bounds", ()  => {
      expect(() => { board.placeShip(carrier, "a8", "a12") }).
        toThrowError("Can't place ship: a8 - a12 is out of grid")
    })

    // it("will not place a ship if cells are occupied", () => {
    // })

  })

  
  

})