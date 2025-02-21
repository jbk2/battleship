# Battleship Game - The Odin Project - JavaScript Course Final Project
A JS implementation of the classic Battleship game built with TDD via Jest.

## Game Rules
- 10x10 grid; x-axis 1-10 left>right, y-axis A-J top>bottom
- 5 ships: Carrier (5), Battleship (4), Cruiser (3), Submarine (3), Destroyer (2)
- Ships can be placed horizontally or vertically
- Ships cannot overlap
- Ships can be next to each other

## Technologies:
- Jest
- Webpack via NPM

## Technical Implementation:
- Board#grid is an object:
  - containing in the 1st dimension 10 objects with keys named a - j (grid rows)
  - within each of the 1st dimension objects is the 2nd dimension of 10 further objects
    with keys named 1 - 10 (grid columns).

## Usage instructions:

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run test` to run the tests
4. Run `npm run serve` to start the development server.
5. Open your browser and navigate to `http://localhost:8080/` to play the game.

### Todos:
- intro win condition stopping play and displaying winner
- write functions to update fleet display elements
- build in 2nd turn on hit
- intro computer move logic to hit near to existing hits
- Add randomise fleet position button 
- capture match game scores
