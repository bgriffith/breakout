import helpers from './utils/helpers';

class Particle {
  /**
   * Represents a Particle
   * @constructor
   * @param {object} context - The canvas context on which to draw
   * @param {object} brick -  The parent brick
   */
  constructor(context, brick) {
    this.context = context;
    this.brick = brick;
    this.rotation = Math.random() * 360;
    this.x = this.brick.x + this.brick.width / 2;
    this.y = this.brick.y + this.brick.height / 2;
    this.dx = Math.cos(helpers.degToRad(this.rotation));
    this.dy = Math.sin(helpers.degToRad(this.rotation));

    this.draw();
  }

  /**
   * Calculate new position
   */
  _setupFrame() {
    this.x += this.dx;
    this.y += this.dy;

    this._render();
  }

  /**
   * Render particle
   */
  _render() {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x, this.y + 1);
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#000';
    this.context.stroke();
  }

  /**
   * Draw particle instance
   */
  draw() {
    this._setupFrame();
  }
}

export default Particle;
