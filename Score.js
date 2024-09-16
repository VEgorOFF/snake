class Score {
  constructor() {
    //инициализировать начальное количество очков
    this.score = 0;
  }

  draw() {
    //логика отрисовка блока с очками
    this.input = document.createElement("input");
    document.body.appendChild(this.input);
    this.input.value = `Ваши очки: ${this.score}`;
  }
}

export default Score;
