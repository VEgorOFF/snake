class Mouse {
  constructor() {
    //инициализация параметров
    //цвет, размер, начальные координаты и тд

    this.mouse;

    this.createMouse = () => {
      const generateMouse = () => {
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
      };

      this.mouseCoordinates = generateMouse();
      this.mouse = document.querySelector('[posX = "' + this.mouseCoordinates[0] + '"][posY = "' + this.mouseCoordinates[1] + '"]');
      while (this.mouse.classList.contains("snakeBody")) {
        this.mouseCoordinates = generateMouse();
        this.mouse = document.querySelector('[posX = "' + this.mouseCoordinates[0] + '"][posY = "' + this.mouseCoordinates[1] + '"]');
      }

      this.mouse.classList.add("mouse");
    };

    this.createMouse();
  }
}

export default Mouse;
