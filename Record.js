class Record {
  constructor() {
    //инициализировать начальное количество очков
    this.record;
  }

  draw() {
    //логика отрисовка блока с очками
    this.input2 = document.createElement("input");
    document.body.appendChild(this.input2);
  }
}

export default Record;
