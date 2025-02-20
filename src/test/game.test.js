import { Game } from '../components/game.js'
import { Player } from '../components/player.js'
import { GridHelper } from '../components/helpers/gridHelper.js'
import { UIController } from '../ui/ui-controller.js';

// Override UI methods to do nothing
UIController.displayBoard = () => {};
UIController.displayTurn = () => {};
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
      
      it("should place the attack on the computer player's board", () => {
        const newGame = new Game();
        const computerPlayersBoard = newGame.getComputerPlayer().getBoard();
        const computerPlayersA1Cell = computerPlayersBoard.getCell('a1');
        
        expect(computerPlayersA1Cell.attacked).toBe(false);
        newGame.processMove('human', 'a1');
        expect(computerPlayersA1Cell.attacked).toBe(true);
      })

      it('should not place the attack if it is not the activePlayer', () => {
        const newGame = new Game();
        newGame.setActivePlayer('computer');
        expect(() => newGame.processMove('human', 'a1'))
          .toThrowError(`activePlayer is '${newGame.getActivePlayer()}', activePlayer must be 'human' for a 'human' to attack`);
      })
      
      it('should toggle the active player after placing the attack', () => {
        const newGame = new Game();
    
        expect(newGame.getActivePlayer()).toBe('human');
        newGame.processMove('human', 'a1');
        expect(newGame.getActivePlayer()).toBe('computer');
      })

      it("declares human the game winner if all computer's ships are sunk", () => {
        const newGame = new Game();
        const computerPlayersBoard = newGame.getComputerPlayer().getBoard();
        computerPlayersBoard.sinkFleet();
        expect(computerPlayersBoard.fleetSunk()).toBe(true)
        const unSunkCell = computerPlayersBoard.unSinkFirstShip()
        expect(computerPlayersBoard.fleetSunk()).toBe(false)
        expect(newGame.processMove('human', unSunkCell)).toEqual('human wins');
      })

      it('should re-render the computers board', () => {
      })
    })
  })

  describe('processComputerMove()', () => {
    describe('a computer player attacking a human player', () => {
      it("should place the attack on the computer player's board", () => {
        const newGame = new Game();
        const humanPlayersBoard = newGame.getHumanPlayer().getBoard();
        newGame.setActivePlayer('computer');
        const preAttackCells = Object.values(humanPlayersBoard.getGrid())
          .flatMap(row => Object.values(row))
          .filter(cell => cell.attacked);
        expect(preAttackCells.length).toBe(0);

        newGame.processMove('computer');
        const postAttackCells = Object.values(humanPlayersBoard.getGrid())
          .flatMap(row => Object.values(row))
          .filter(cell => cell.attacked);
        expect(postAttackCells.length).toBe(1);
      })
    })

    it('should not place the attack if it is not the activePlayer', () => {
      const newGame = new Game();
      const humanPlayer = newGame.getHumanPlayer();
      const computerPlayer = newGame.getComputerPlayer();
      expect(() => {newGame.processMove('computer')})
        .toThrowError(`activePlayer is '${newGame.getActivePlayer()}', activePlayer must be 'computer' for a 'computer' to attack`);
    })

    it('should toggle the active player after placing the attack', () => {
      const newGame = new Game();
      const computerPlayer = newGame.getComputerPlayer();
      newGame.setActivePlayer('computer');
      expect(newGame.getActivePlayer()).toBe('computer');
      newGame.processMove('computer');
      expect(newGame.getActivePlayer()).toBe('human');
    })

    it("declares computer the game winner if all humans's ships are sunk", () => {
      const newGame = new Game();
      const humanPlayer = newGame.getHumanPlayer();
      const humanPlayersBoard = humanPlayer.getBoard();
      humanPlayersBoard.sinkFleet();
      expect(humanPlayersBoard.fleetSunk()).toBe(true)
      
      const unSunkCell = humanPlayersBoard.unSinkFirstShip();
      expect(humanPlayersBoard.fleetSunk()).toBe(false)

      newGame.setActivePlayer('computer')
      expect(newGame.processMove('computer', unSunkCell)).toEqual('computer wins');
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