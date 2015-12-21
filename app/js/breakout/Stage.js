
class Stage {
  constructor(context, width, height, backgroundColor) {
    this.width = width;
    this.height = height;
    this.context = context;
    this.backgroundColor = backgroundColor;
  }

  draw() {
    this.context.beginPath();
    this.context.rect(0, 0, this.width, this.height);
    this.context.fillStyle = this.backgroundColor;
    this.context.fill();
    this.context.closePath();
  }
}

export default Stage;