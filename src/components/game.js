import { UIController } from "../ui/ui-controller.js";
import { GridHelper } from "./helpers/gridHelper.js";
import { Player } from "./player.js";

export class Game {
  #activePlayer;
  #humanPlayer;
  #computerPlayer;

  constructor() {
    this.setActivePlayer("human");
    this.setPlayers();
  }

  setPlayers() {
    this.#humanPlayer = new Player("human");
    this.#computerPlayer = new Player("computer");
    // populate their boards
    const humansBoard = this.getHumanPlayer().getBoard();
    const computersBoard = this.getComputerPlayer().getBoard();
    humansBoard.populateBoard();
    computersBoard.populateBoard();
  }

  setActivePlayer(player) {
    if (player != "human" && player != "computer") {
      throw new Error("player must be of type 'human' or 'computer'");
    }
    this.#activePlayer = player;
  }

  getActivePlayer() {
    return this.#activePlayer;
  }

  toggleActivePlayer() {
    this.#activePlayer = this.#activePlayer === "human" ? "computer" : "human";
  }

  getHumanPlayer() {
    return this.#humanPlayer;
  }

  getComputerPlayer() {
    return this.#computerPlayer;
  }

  processMove(playerType, cell = null) {
    if (this.getActivePlayer() != playerType) {
      throw new Error(
        `activePlayer is '${this.getActivePlayer()}', activePlayer must be '${playerType}' for a '${playerType}' to attack`
      );
    }

    const isHumanMove = playerType === "human";
    const computersBoard = this.getComputerPlayer().getBoard();
    const humansBoard = this.getHumanPlayer().getBoard();
    const opponentsBoard = isHumanMove ? computersBoard : humansBoard;
    const boardOwnerTypeToUpdate = isHumanMove ? "computer" : "human";

    try {
      if (!isHumanMove && cell === null) {
        cell = humansBoard.getComputerMove()
      }
    
    const targetCell = opponentsBoard.getCell(cell);
    if (targetCell.attacked === true) {
      console.warn(`Cell ${cell} was already attacked; ignoring duplicate move.`);
      return;
    }

      opponentsBoard.receiveAttack(cell);
      UIController.displayBoard(this, opponentsBoard, boardOwnerTypeToUpdate);

      if (!isHumanMove) {
        UIController.addComputerBoardListeners(this, computersBoard);
      } else if (isHumanMove) {
        UIController.removeComputerBoardListeners(computersBoard);
      }

      if (this.checkWin(opponentsBoard)) {
        return `${playerType} wins`;
      }

      this.toggleActivePlayer();
      UIController.displayTurn(this.getActivePlayer());

      if (this.getActivePlayer() === "computer") {
        setTimeout(() => this.processMove("computer", null), 200);
      }

      return null;
    } catch (error) {
      console.log(`was an error trying to call #receiveAttack(${cell})`, error);
      throw error;
    }
  }

  // if true this needs to update UI, stop game, offer re-game
  checkWin(board) {
    return board.fleetSunk();
  }

  startGame() {
    // ui signify humans turn:
    UIController.displayTurn(this.getActivePlayer());
    const computersBoard = this.getComputerPlayer().getBoard();
    UIController.addComputerBoardListeners(this, computersBoard);
    // place attack
    // evaluate win
    // if win notify ui, stop game (remove computer baord event listeners)
    // if no win
    // ui signify computers turn, temporarily remove computer baord event listeners.
    // make computer move
    // place attack
    // evaluate win
  }
}
