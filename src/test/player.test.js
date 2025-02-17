import { Player } from '../components/player.js'
import { Board } from '../components/board.js'
import { GridHelper } from '../components/helpers/gridHelper.js'

describe("Player", () => {
  describe("instantiation with type", () => {
    it("if passed 'human' sets the players type as 'human'", () => {
      const humanPlayer = new Player('human');
      expect(humanPlayer.getType()).toBe('human');
    })
    it("if passed 'computer' sets the players type as 'computer'", () => {
      const computerPlayer = new Player('computer');
      expect(computerPlayer.getType()).toBe('computer');
    })
  })
  
  describe("instantiation without type", () => {
    it("throws an error", () => {
      expect(() => { invalidPlayer = new Player() })
        .toThrowError("type must be either 'human' or 'computer'");
    })
  })

  describe("each player gets instantiated with its own board object", () => {
    it("should possess its own instance of a board", () => {
      const humanPlayer = new Player('human')
      expect(humanPlayer.getBoard()).toBeInstanceOf(Board);
      const humansBoard = humanPlayer.getBoard()
      expect(GridHelper.getEmptyCells(humansBoard.getGrid()).length).toBe(100);
    })
  })
})