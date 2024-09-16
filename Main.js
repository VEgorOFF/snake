import GameField from "./GameField.js";
import Snake from "./Snake.js";

class Main {
  constructor() {
    this.viewGameField = new GameField();
    this.viewSnake = new Snake();
    this.viewSnake.load();
    this.viewSnake.update();
    this.viewSnake.control();
  }
}

const main = new Main();
