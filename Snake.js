import Mouse from "./Mouse.js";
import Score from "./Score.js";
import Record from "./Record.js";

class Snake {
  constructor() {
    //иницализация змейки
    //например размер змейки, цвет
    //начальное позиционирование и др

    this.viewMouse = new Mouse();
    this.viewScore = new Score();
    this.viewScore.draw();
    this.viewRecord = new Record();
    this.viewRecord.draw();
    this.draw();
  }

  draw() {
    //логика отрисовки змейки
    this.generateSnake = () => {
      this.posX = Math.round(Math.random() * (10 - 3) + 3);
      this.posY = Math.round(Math.random() * (10 - 1) + 1);
      return [this.posX, this.posY];
    };

    this.coordinates = this.generateSnake();
    this.snakeBody = [document.querySelector('[posX = "' + this.coordinates[0] + '"][posY = "' + this.coordinates[1] + '"]'), document.querySelector('[posX = "' + (this.coordinates[0] - 1) + '"][posY = "' + this.coordinates[1] + '"]')];

    for (let i = 0; i < this.snakeBody.length; i++) {
      this.snakeBody[i].classList.add("snakeBody");
    }

    this.snakeBody[0].classList.add("head");
  }

  death() {
    //логика смерти змейки
    // завешение игры

    if (this.viewScore.score > localStorage.getItem("key")) {
      this.viewRecord.record = this.viewScore.score;
      localStorage.setItem("key", this.viewRecord.record);
      this.viewRecord.input2.style = "display: block;";
      this.viewRecord.input2.value = `Рекорд: ${localStorage.getItem("key")}`;
    } else {
      this.viewRecord.input2.value = `Рекорд: ${localStorage.getItem("key")}`;
    }

    setTimeout(() => {
      alert("Конец игры");
    }, 200);

    clearInterval(this.interval);

    const button = document.createElement("button");
    button.textContent = "Начать заного";
    document.body.append(button);

    button.addEventListener("click", () => {
      window.location.reload();
    });
  }

  update() {
    //логика именно обновления змейки
    //при каких условиях необходимо меняться?

    this.direction = "right";
    this.steps = false;

    this.move = () => {
      this.snakeCoordinates = [this.snakeBody[0].getAttribute("posX"), this.snakeBody[0].getAttribute("posY")];
      this.snakeBody[0].classList.remove("head");
      this.snakeBody[this.snakeBody.length - 1].classList.remove("snakeBody");
      this.snakeBody.pop();

      if (this.direction == "right") {
        if (this.snakeCoordinates[0] < 10) {
          this.snakeBody.unshift(document.querySelector('[posX = "' + (+this.snakeCoordinates[0] + 1) + '"][posY = "' + this.snakeCoordinates[1] + '"]'));
        } else {
          this.snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + this.snakeCoordinates[1] + '"]'));
        }
      } else if (this.direction == "left") {
        if (this.snakeCoordinates[0] > 1) {
          this.snakeBody.unshift(document.querySelector('[posX = "' + (+this.snakeCoordinates[0] - 1) + '"][posY = "' + this.snakeCoordinates[1] + '"]'));
        } else {
          this.snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + this.snakeCoordinates[1] + '"]'));
        }
      } else if (this.direction == "up") {
        if (this.snakeCoordinates[1] < 10) {
          this.snakeBody.unshift(document.querySelector('[posX = "' + this.snakeCoordinates[0] + '"][posY = "' + (+this.snakeCoordinates[1] + 1) + '"]'));
        } else {
          this.snakeBody.unshift(document.querySelector('[posX = "' + this.snakeCoordinates[0] + '"][posY = "1"]'));
        }
      } else if (this.direction == "down") {
        if (this.snakeCoordinates[1] > 1) {
          this.snakeBody.unshift(document.querySelector('[posX = "' + this.snakeCoordinates[0] + '"][posY = "' + (+this.snakeCoordinates[1] - 1) + '"]'));
        } else {
          this.snakeBody.unshift(document.querySelector('[posX = "' + this.snakeCoordinates[0] + '"][posY = "10"]'));
        }
      }

      if (this.snakeBody[0].classList.contains("snakeBody")) {
        this.death();
      }

      if (this.snakeBody[0].getAttribute("posX") == this.viewMouse.mouse.getAttribute("posX") && this.snakeBody[0].getAttribute("posY") == this.viewMouse.mouse.getAttribute("posY")) {
        this.apple();
      }

      this.snakeBody[0].classList.add("head");
      for (let i = 0; i < this.snakeBody.length; i++) {
        this.snakeBody[i].classList.add("snakeBody");
      }

      this.steps = true;
    };

    this.interval = setInterval(this.move, 300);
  }

  apple() {
    this.viewMouse.mouse.classList.remove("mouse");
    let a = this.snakeBody[this.snakeBody.length - 1].getAttribute("posX");
    let b = this.snakeBody[this.snakeBody.length - 1].getAttribute("posY");
    this.snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
    this.viewMouse.createMouse();
    this.viewScore.score++;
    this.viewScore.input.value = `Ваши очки: ${this.viewScore.score}`;
  }

  control() {
    //логика управления змейкой
    //обработка кнопок на клавиатуре
    window.addEventListener("keydown", (e) => {
      if (this.steps == true) {
        if (e.keyCode == 37 && this.direction != "right") {
          this.direction = "left";
          this.steps = false;
        } else if (e.keyCode == 38 && this.direction != "down") {
          this.direction = "up";
          this.steps = false;
        } else if (e.keyCode == 39 && this.direction != "left") {
          this.direction = "right";
          this.steps = false;
        } else if (e.keyCode == 40 && this.direction != "up") {
          this.direction = "down";
          this.steps = false;
        }
      }
    });
  }

  load() {
    this.viewRecord.record = localStorage.getItem("key");
    if (localStorage.getItem("key") > 0) {
      this.viewRecord.record = localStorage.getItem("key");
    } else {
      this.viewRecord.input2.style = "display: none;";
    }
    this.viewRecord.input2.value = `Рекорд: ${this.viewRecord.record}`;
  }
}

export default Snake;
