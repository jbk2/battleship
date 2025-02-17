import './assets/stylesheets/styles.css'
import board from './views/partials/_board.html'

document.addEventListener("DOMContentLoaded", () => {
  const humansBoard = document.getElementById('humans-board')
  humansBoard.insertAdjacentHTML('beforeend', board);
  humansBoard.querySelector('.board-title').innerText = "Human player's board"
  
  const computersBoard = document.getElementById('computers-board')
  computersBoard.insertAdjacentHTML('beforeend', board);
  computersBoard.querySelector('.board-title').innerText = "Computer player's board"


})

console.log("Hello This is a Javascript project. I am working");
