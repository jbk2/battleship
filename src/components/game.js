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

  async processMove(playerType, cell = null) {
    if (this.getActivePlayer() != playerType) {
      throw new Error(
        `activePlayer is '${this.getActivePlayer()}', ` +
        `activePlayer must be '${playerType}' for a '${playerType}' to attack`
      );
    }

    const isHumanMove = playerType === "human";
    const computersBoard = this.getComputerPlayer().getBoard();
    const humansBoard = this.getHumanPlayer().getBoard();
    const opponentsBoard = isHumanMove ? computersBoard : humansBoard;
    const boardOwnerTypeToUpdate = isHumanMove ? "computer" : "human";

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      if (!isHumanMove && cell === null) {
        cell = humansBoard.getComputerMove()
      };
      const attack = opponentsBoard.receiveAttack(cell)
      const isHit = attack.hit
      
      UIController.displayBoard(this, opponentsBoard, boardOwnerTypeToUpdate);
      
      if (this.checkWin(opponentsBoard)) {
        UIController.launchConfetti();
        if(!isHumanMove) { UIController.removeComputerBoardListeners(computersBoard) };
        UIController.displayWin(playerType);
        return `${playerType} wins`;
      }

      await sleep(250);

      if (isHit) {
        if (isHumanMove) {
          UIController.addComputerBoardListeners(this, computersBoard)
          return;
        } else {
          setTimeout(() => this.processMove(playerType), 400);
          return;
        }
      }
      
      this.toggleActivePlayer();
      UIController.displayTurn(this.getActivePlayer());

      if (this.getActivePlayer() === 'computer') {
        setTimeout(() => this.processMove("computer", null), 500)
      } else {
        UIController.addComputerBoardListeners(this, computersBoard);
      }
      
      return null;
    } catch (error) {
      console.log(`was an error trying to call #receiveAttack(${cell})`, error);
      throw error;
    }
  }

  checkWin(board) {
    return board.fleetSunk();
  }

  startGame() {
    UIController.displayTurn(this.getActivePlayer());
    const computersBoard = this.getComputerPlayer().getBoard();
    UIController.addComputerBoardListeners(this, computersBoard);
  }
}
