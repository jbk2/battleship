import { Game } from '../components/game.js'
import { Player } from '../components/player.js'

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
        const humanPlayer = newGame.getHumanPlayer();
        const computerPlayer = newGame.getComputerPlayer();
        const computerPlayersBoard = computerPlayer.getBoard();
        const computerPlayersA1Cell = computerPlayersBoard.getCell('a1');
    
        expect(computerPlayersA1Cell.attacked).toBe(false);
        newGame.processHumanMove('a1');
        expect(computerPlayersA1Cell.attacked).toBe(true);
      })

      it('should not place the attack if it is not the activePlayer', () => {
        const newGame = new Game();
        const humanPlayer = newGame.getHumanPlayer();
        const computerPlayer = newGame.getComputerPlayer();
        newGame.setActivePlayer('computer');
        expect(() => {newGame.processHumanMove('a1')})
          .toThrowError(`activePlayer is '${newGame.getActivePlayer()}', \
          activePlayer must be 'human' for a 'human' to attack`);
      })
      
      it('should toggle the active player after placing the attack', () => {
        const newGame = new Game();
        const humanPlayer = newGame.getHumanPlayer();
        const computerPlayer = newGame.getComputerPlayer();
        const computerPlayersBoard = computerPlayer.getBoard();
        const computerPlayersA1Cell = computerPlayersBoard.getCell('a1');
    
        expect(newGame.getActivePlayer()).toBe('human');
        newGame.processHumanMove('a1');
        expect(newGame.getActivePlayer()).toBe('computer');
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

        newGame.processComputerMove();
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
      expect(() => {newGame.processComputerMove()})
        .toThrowError(`activePlayer is '${newGame.getActivePlayer()}', \
        activePlayer must be 'computer' for a 'computer' to attack`);
    })

    it('should toggle the active player after placing the attack', () => {
      const newGame = new Game();
      const computerPlayer = newGame.getComputerPlayer();
      newGame.setActivePlayer('computer');
      expect(newGame.getActivePlayer()).toBe('computer');
      newGame.processComputerMove();
      expect(newGame.getActivePlayer()).toBe('human');
    })
  })
  
})