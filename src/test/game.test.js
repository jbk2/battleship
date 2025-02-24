import { Game } from '../components/game.js'
import { Player } from '../components/player.js'
import { GridHelper } from '../components/helpers/gridHelper.js'
import { UIController } from '../ui/ui-controller.js';

// Override UI methods to do nothing
UIController.displayBoard = () => {};
UIController.displayTurn = () => {};
UIController.displayWin = () => {};
UIController.addComputerBoardListeners = () => {};

describe('Game', () => {
  describe('instantiaing a game', () => {
    it('will set the activePlayer to the human', () => {
      const newGame = new Game();
      expect(newGame.getActivePlayer()).toEqual('human');
    })
    
    it('sets a humanPlayer', () => {
      const newGame = new Game();
      const humanPlayer = newGame.getHumanPlayer();
      expect(humanPlayer).toBeInstanceOf(Player);
      expect(humanPlayer.getType()).toBe('human');
    })
    
    it('sets a computerPlayer', () => {
      const newGame = new Game();
      const computerPlayer = newGame.getComputerPlayer();
      expect(computerPlayer).toBeInstanceOf(Player);
      expect(computerPlayer.getType()).toBe('computer');
    })
  })
  
  describe('toggleActivePlayer', () => {
    it('toggles activePlayer from human to computer', () => {
      const newGame = new Game();
      expect(newGame.getActivePlayer()).toEqual('human');
      newGame.toggleActivePlayer();
      expect(newGame.getActivePlayer()).toEqual('computer');
    })
  })
  
  describe('processHumanMove()', () => {
    describe('a human player attacking a computer player', () => {
      
      it("should place the attack on the computer player's board", async () => {
        const newGame = new Game();
        const computerPlayersBoard = newGame.getComputerPlayer().getBoard();
        const computerPlayersA1Cell = computerPlayersBoard.getCell('a1');
        
        expect(computerPlayersA1Cell.attacked).toBe(false);
        await newGame.processMove('human', 'a1');
        expect(computerPlayersA1Cell.attacked).toBe(true);
      })

      // it('should not place the attack if it is not the activePlayer', async () => {
      //   const newGame = new Game();
      //   newGame.setActivePlayer('computer');
      //   await expect(() => newGame.processMove('human', 'a1'))
      //     .rejects.toThrowError(`activePlayer is '${newGame.getActivePlayer()}', ` +
      //     `activePlayer must be 'human' for a 'human' to attack`);
      // })

      it('should not place the attack if it is not the activePlayer', async () => {
        const newGame = new Game();
        newGame.setActivePlayer('computer');
        await expect(newGame.processMove('human', 'a1'))
            .rejects.toThrowError(
                `activePlayer is '${newGame.getActivePlayer()}', ` +
                `activePlayer must be 'human' for a 'human' to attack`
            );
      });
    
      
      it('should toggle the active player after placing the attack', async () => {
        const newGame = new Game();
        expect(newGame.getActivePlayer()).toBe('human');
        await newGame.processMove('human', 'a1');
        expect(newGame.getActivePlayer()).toBe('computer');
      })

      it("allows a 2nd attack if a ship was hit", async () => {
        const newGame = new Game();
        const computerPlayersBoard = newGame.getComputerPlayer().getBoard();
        const firstComputerShipId = Object.keys(computerPlayersBoard.getShips())[0];
        const firstComputerShipsCells = GridHelper
          .getShipsCells(computerPlayersBoard.getGrid(), firstComputerShipId);
        const emptyCellCoord = GridHelper.getEmptyCells(computerPlayersBoard.getGrid())[0].position;

        expect(newGame.getActivePlayer()).toBe('human');
        await newGame.processMove('human', firstComputerShipsCells[0]);
        expect(newGame.getActivePlayer()).toBe('human');
        await newGame.processMove('human', firstComputerShipsCells[1]);
        expect(newGame.getActivePlayer()).toBe('human');
        await newGame.processMove('human', emptyCellCoord);
        expect(newGame.getActivePlayer()).toBe('computer');
      })

      it("declares human the game winner if all computer's ships are sunk", async () => {
        const newGame = new Game();
        const computerPlayersBoard = newGame.getComputerPlayer().getBoard();
        computerPlayersBoard.sinkFleet();
        expect(computerPlayersBoard.fleetSunk()).toBe(true)
        const unSunkCell = computerPlayersBoard.unSinkFirstShip()
        expect(computerPlayersBoard.fleetSunk()).toBe(false)
        await expect(newGame.processMove('human', unSunkCell)).resolves.toEqual('human wins');
      })
    })
  })

  describe('processComputerMove()', () => {
    describe('a computer player attacking a human player', () => {
      it("should place the attack on the computer player's board", async() => {
        const newGame = new Game();
        const humanPlayersBoard = newGame.getHumanPlayer().getBoard();
        newGame.setActivePlayer('computer');
        const preAttackCells = Object.values(humanPlayersBoard.getGrid())
          .flatMap(row => Object.values(row))
          .filter(cell => cell.attacked);
        expect(preAttackCells.length).toBe(0);

        await newGame.processMove('computer');
        const postAttackCells = Object.values(humanPlayersBoard.getGrid())
          .flatMap(row => Object.values(row))
          .filter(cell => cell.attacked);
        expect(postAttackCells.length).toBe(1);
      })
    })

    it('should not place the attack if it is not the activePlayer', async () => {
      const newGame = new Game();
      const humanPlayer = newGame.getHumanPlayer();
      const computerPlayer = newGame.getComputerPlayer();
      await expect(newGame.processMove('computer'))
        .rejects.toThrowError(`activePlayer is '${newGame.getActivePlayer()}', ` +
        `activePlayer must be 'computer' for a 'computer' to attack`);
    })

    it('should toggle the active player after placing the attack', async () => {
      const newGame = new Game();
      const humanPlayersBoard = newGame.getHumanPlayer().getBoard();
      const emptyCell = GridHelper.getEmptyCells(humanPlayersBoard.getGrid())[0].position;
      newGame.setActivePlayer('computer');
      expect(newGame.getActivePlayer()).toBe('computer');
      await newGame.processMove('computer', emptyCell);
      expect(newGame.getActivePlayer()).toBe('human');
    })

    it("allows a 2nd attack if a ship was hit", async () => {
      const newGame = new Game();
      const humanPlayersBoard = newGame.getHumanPlayer().getBoard();
      const firstHumanShipId = Object.keys(humanPlayersBoard.getShips())[0];
      const firstHumanShipsCells = GridHelper
        .getShipsCells(humanPlayersBoard.getGrid(), firstHumanShipId);
      const emptyCellCoord = GridHelper.getEmptyCells(humanPlayersBoard.getGrid())[0].position;

      newGame.setActivePlayer('computer');
      expect(newGame.getActivePlayer()).toBe('computer');
      await newGame.processMove('computer', firstHumanShipsCells[0]);
      expect(newGame.getActivePlayer()).toBe('computer');
      await newGame.processMove('computer', firstHumanShipsCells[1]);
      expect(newGame.getActivePlayer()).toBe('computer');
      await newGame.processMove('computer', emptyCellCoord);
      expect(newGame.getActivePlayer()).toBe('human');
    })

    it("declares computer the game winner if all humans's ships are sunk", async () => {
      const newGame = new Game();
      const humanPlayer = newGame.getHumanPlayer();
      const humanPlayersBoard = humanPlayer.getBoard();
      humanPlayersBoard.sinkFleet();
      expect(humanPlayersBoard.fleetSunk()).toBe(true)
      
      const unSunkCell = humanPlayersBoard.unSinkFirstShip();
      expect(humanPlayersBoard.fleetSunk()).toBe(false)

      newGame.setActivePlayer('computer')
      await expect(newGame.processMove('computer', unSunkCell)).resolves.toEqual('computer wins');
    })
  })

  describe('checkWin()', () => {
    it("returns true if given board's fleet is sunk", () => {
      const newGame = new Game();
      const humanPlayersBoard = newGame.getHumanPlayer().getBoard();
      humanPlayersBoard.sinkFleet();
      expect(newGame.checkWin(humanPlayersBoard)).toBe(true);
    })

    it("returns false if given board's fleet is not sunk", () => {
      const newGame = new Game();
      const humanPlayersBoard = newGame.getHumanPlayer().getBoard();
      expect(newGame.checkWin(humanPlayersBoard)).toBe(false);
    })  

  })
  
})