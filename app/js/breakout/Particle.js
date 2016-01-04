class Particle {
  constructor(context, brick) {
    this.context = context;
    this.brick = brick;
    this.rotation = Math.random() * 360;
    this.x = this.brick.x + this.brick.width / 2;
    this.y = this.brick.y + this.brick.height / 2;
    this.dx = Math.cos(this._degToRad(this.rotation));
    this.dy = Math.sin(this._degToRad(this.rotation));

    this.draw();
  }

  _degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  _setupFrame() {
    this.x += this.dx;
    this.y += this.dy;

    this._render();
  }

  _render() {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x, this.y + 1);
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#000';
    this.context.stroke();
  }

  draw() {
    this._setupFrame();
  }
}

export default Particle;
