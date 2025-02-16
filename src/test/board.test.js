import { Board } from "../components/board.js";
import { Ship } from "../components/ship.js";

describe("Board", () => {
  describe("grid instantiation", () => {
    it("instantiates a 10x10 grid object with a-j row keys and 1-10 col keys", () => {
      const newBoard = new Board();
      const grid = newBoard.getGrid();

      expect(Object.keys(grid).length).toBe(10);
      Object.keys(grid).forEach((row) => {
        expect(Object.keys(grid[row]).length).toBe(10);
        Object.keys(grid[row]).forEach((col) => {
          expect(grid[row][col]).toBeNull();
        });
      });
    });
  });

  describe("placeShip()", () => {
    const board = new Board();
    const carrier = new Ship(5);
    board.placeShip(carrier, "a1", "a5");

    it("will store the ship and its ID in #ships", () => {
      expect(board.getShip(carrier.getId())).toEqual(carrier);
    });

    it("can place a ship if cells are unoccupied", () => {
      // console.log(board.getGrid())
      expect(board.getCell("a1")).not.toBeNull();
      expect(board.getCell("a1")).toEqual({ shipId: carrier.getId() });
      expect(board.getCell("a2")).not.toBeNull();
      expect(board.getCell("a3")).not.toBeNull();
      expect(board.getCell("a4")).not.toBeNull();
      expect(board.getCell("a5")).not.toBeNull();
      expect(board.getCell("a6")).toBeNull();
    });

    it("will not place ship if coords are out of grid bounds", () => {
      expect(() => {
        board.placeShip(carrier, "a8", "a12");
      }).toThrowError("Can't place ship: a8 - a12 is out of grid");
    });

    it("will not place a ship if cells are occupied", () => {
      const destroyer = new Ship(2);
      expect(() => board.placeShip(destroyer, "a1", "a2")).toThrowError(
        "Can't place ship as not all of its cells are empty"
      );
    });

    it("will not place the ship unless it's vertical or horizontal", () => {
      const battleship = new Ship(4);
      expect(() => board.placeShip(battleship, "b1", "e4")).toThrowError(
        "Can't place ship: b1 - e4 is diagonal positioning"
      );
      expect(() => board.placeShip(battleship, "j1", "g4")).toThrowError(
        "Can't place ship: j1 - g4 is diagonal positioning"
      );
    });

    it("cannot place ship if placement cells exceed ships size", () => {
      const battleship = new Ship(4);
      expect(() => board.placeShip(battleship, "b1", "f1")).toThrowError(
        "Cell placement size does not equal ship size"
      );
    });

    it("cannot place ship if placement cells are less than ships size", () => {
      const cruiser = new Ship(3);
      expect(() => board.placeShip(cruiser, "j1", "j2")).toThrowError(
        "Cell placement size does not equal ship size"
      );
    });
  });
});
