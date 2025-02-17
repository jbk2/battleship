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
          expect(grid[row][col].shipId).toBeNull();
        });
      });
    });
  });

  describe("placeShip()", () => {
    let board;
    let carrier;

    beforeEach(() => {
      board = new Board();
      carrier = new Ship(5);
    })
    
    it("will store the ship and its ID in #ships", () => {
      board.placeShip(carrier, "a1", "a5")
      expect(board.getShip(carrier.getId())).toEqual(carrier);
    });
    
    it("can place a ship if cells are unoccupied", () => {
      expect(board.placeShip(carrier, "a1", "a5"))
        .toEqual({message: "Ship placed between a1-a5", success: true})
      expect(board.getCell("a1").shipId).not.toBeNull();
      expect(board.getCell("a1").shipId).toEqual(carrier.getId());
      expect(board.getCell("a2").shipId).not.toBeNull();
      expect(board.getCell("a3").shipId).not.toBeNull();
      expect(board.getCell("a4").shipId).not.toBeNull();
      expect(board.getCell("a5").shipId).not.toBeNull();
      expect(board.getCell("a6").shipId).toBeNull();
    });

    it("will not place ship if coords are out of grid bounds", () => {
      expect(() => board.placeShip(carrier, "a8", "a12"))
        .toThrowError(`Error placing ship ${carrier.getId()} at a8 - a12: Can't place ship: a8 - a12 is out of bounds`
      );
    });

    it("will not place a ship if cells are occupied", () => {
      board.placeShip(carrier, "a1", "a5");
      const destroyer = new Ship(2);
      expect(() => board.placeShip(destroyer, "a1", "a2")).toThrowError(
        `Error placing ship ${destroyer.getId()} at a1 - a2: Can't place ship as not all of its cells are empty`
      );
    });

    it("will not place the ship unless it's vertical or horizontal", () => {
      const battleship = new Ship(4);
      expect(() => board.placeShip(battleship, "b1", "e4"))
        .toThrowError(`Error placing ship ${battleship.getId()} at b1 - e4: Can't place ship: b1 - e4 is diagonal positioning`
      );
      expect(() => board.placeShip(battleship, "j1", "g4"))
        .toThrowError(`Error placing ship ${battleship.getId()} at j1 - g4: Can't place ship: j1 - g4 is diagonal positioning`
      );
    });
      
    it("cannot place ship if placement cells exceed ships size", () => {
      const battleship = new Ship(4);
      expect(() => board.placeShip(battleship, "b1", "f1"))
        .toThrowError(`Error placing ship ${battleship.getId()} at b1 - f1: Cell placement size does not equal ship size`
      )
    });

    it("cannot place ship if placement cells are less than ships size", () => {
      const cruiser = new Ship(3);
      expect(() => board.placeShip(cruiser, "j1", "j2"))
        .toThrowError(`Error placing ship ${cruiser.getId()} at j1 - j2: Cell placement size does not equal ship size`
      )
    });
  });

  describe("receiveAttack()", () => {
    let board;
    let carrier;

    describe("if a hit", () => {
      beforeEach(() => {
        board = new Board();
        carrier = new Ship(5);
        board.placeShip(carrier, 'a1', 'a5')
      })
      
      it("should determine and return that it is a hit", () => {
        expect(board.receiveAttack('a1')).toEqual({ hit: true })
      })

      it("should record the cell as having been attacked", () => {
        board.receiveAttack('a1')
        expect(board.getCell('a1').attacked).toBe(true)
      })

      it("should update the correct ships hit count", () => {
        board.receiveAttack('a1')
        const cellA1 = board.getCell('a1')
        const shipInA1 = board.getShip(cellA1.shipId)
        expect(shipInA1.getHits()).toEqual(1)
      })
      
    })

    describe("if a miss", () => {
      beforeEach(() => {
        board = new Board();
        carrier = new Ship(5);
        board.placeShip(carrier, 'a1', 'a5')
      })

      it("should determine and return that it is a miss", () => {
        expect(board.receiveAttack('a6')).toEqual({ hit: false })
      })

      it("should record the cell as having been attacked", () => {
        board.receiveAttack('a6')
        expect(board.getCell('a6').attacked).toBe(true)
      })
    })

    describe("if a hit", () => {
      beforeEach(() => {
        board = new Board();
        carrier = new Ship(5);
        board.placeShip(carrier, 'a1', 'a5')
      })

      it("throws an error if cell has already been attacked", () => {
        board.receiveAttack('b1')
        expect(() => {board.receiveAttack('b1')})
          .toThrowError({ success: false, message: "cell has already been attacked" })
      })
    })
  })

  describe("populateBoard()", () => {
    it("randomly places whole fleet on the board", () => {
      const newBoard = new Board();
      expect(Object.keys(newBoard.getShips()).length).toBe(0)
      newBoard.populateBoard();
      // console.log(newBoard.getGrid())
      expect(Object.keys(newBoard.getShips()).length).toBe(5)
    })
  })
  
  describe("sinkShip()", () => {
    it("should hit all cells of a ship, carrier example", () => {
      const board = new Board();
      const carrier = new Ship(5);
      board.placeShip(carrier, 'a1', 'a5');
      expect(carrier.getHits()).toBe(0);
      expect(carrier.isSunk()).toBe(false);
      board.sinkShip(carrier.getId());
      expect(carrier.getHits()).toBe(5);
      expect(carrier.isSunk()).toBe(true);
    })
    
    it("should hit all cells of a ship, submarine example", () => {
      const board = new Board();
      const submarine = new Ship(3);
      board.placeShip(submarine, 'j1', 'j3');
      expect(submarine.getHits()).toBe(0);
      expect(submarine.isSunk()).toBe(false);
      board.sinkShip(submarine.getId());
      expect(submarine.getHits()).toBe(3);
      expect(submarine.isSunk()).toBe(true);
    })
  })

  describe("sinkFleet()", () => {
    it("sinks all ships on the board", () => {
      const board = new Board();
      board.populateBoard();
      const ships = Object.values(board.getShips())
      ships.forEach(ship => {
        expect(ship.isSunk()).toBe(false);
      })
      board.sinkFleet()
      ships.forEach(ship => {
        expect(ship.isSunk()).toBe(true);
      })
    })
  })

  describe("fleetSunk()", () => {
    const board = new Board();
    board.populateBoard();
    
    it("returns false if no ships are sunk", () => {
      expect(board.fleetSunk()).toBe(false);
    })
    
    it("returns false if only some ships are sunk", () => {
      const board = new Board();
      board.populateBoard();
      const shipsIds = Object.keys(board.getShips())
      board.sinkShip(shipsIds[0])
      board.sinkShip(shipsIds[1])
      expect(board.fleetSunk()).toBe(false);
    })
    
    it("returns true if all ships are sunk", () => {
      board.sinkFleet();
      expect(board.fleetSunk()).toBe(true);
    })
  })
  
  // check whether entire fleet is sunk.
  describe("fleetSunk()", () => {
    const newBoard = new Board();
    newBoard.populateBoard();
    it("returns false if not all ships on board are sunk", () => {
      expect(newBoard.fleetSunk()).toEqual(false);
    })
    
    it("returns true if all ships on board are sunk", () => {
      expect(newBoard.fleetSunk()).toEqual(false);
    })
  })

});
