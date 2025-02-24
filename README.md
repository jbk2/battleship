# Battleship Game - The Odin Project - JavaScript Course [Final Project](https://www.theodinproject.com/lessons/javascript-battleship)
A JS implementation of the classic Battleship game built with TDD via Jest.

## Game Rules
- 10x10 grid; x-axis 1-10 left>right, y-axis A-J top>bottom.
- 5 ships: Carrier (5), Battleship (4), Cruiser (3), Submarine (3), Destroyer (2).
- Ships can be placed horizontally or vertically.
- Ships cannot overlap.
- Ships can be next to each other (as per Hasbro rules).

## Technologies:
- JavaScript
- Jest
- Webpack

## Technical Implementation:
- Game has Players, Players have Boards, Boards have Ships.
- Board has a #grid property, which is an object:
  - containing in the 1st dimension 10 objects with keys named a - j (grid rows)
  - within each of the 1st dimension objects is the 2nd dimension of 10 further objects
    (the cells) with keys named 1 - 10 (grid columns).
  - Cells contain reference to the Ships via an ID, and whether the cell has been attacked or not.
  - Ships know their length and type, and how many hits they're received, terefore whether they're
    sunk.

## Usage instructions:
### - Play online
1. Open your browser and navigate to [Battleship Game](https://battleship-game-odin.netlify.app/).
2. Click 'Play' to start the game.

### - Clone and run locally
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run test` to run the tests
4. Run `npm run serve` to start the development server.
5. Open your browser and navigate to `http://localhost:8080/` to play the game.

### Todos:
- update logic so that ships cannot be placed next to each other.
- capture match game scores
- write up presentable README
- deploy to ec2 server

## Future improvements
- implement human player drag and drop ship placement
- improve computer move logic; easy, medium, hard modes
- implement computer AI to play against
- implement multiplayer mode






