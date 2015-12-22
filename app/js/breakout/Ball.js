class Ball {
  /**
   * Represents the Ball
   * @constructor
   * @param {object} context - The canvas context on which to draw
   * @param {int} canvasWidth -  Width of canvas
   * @param {int} canvasHeight - Height of canvas
   * @param {string} color - Fill color of ball
   * @param {int} radius - Radius of ball
   */
  constructor(context, canvasWidth, canvasHeight, color = '#000', radius = 6) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = this.canvasWidth / 2;
    this.y = 200;
    this.color = color;
    this.radius = radius;
    this.dx = 2; // Initial x-axis directional value
    this.dy = -2; // Initial y-axis directional value
  }

  /**
   * Configure the direction values of the ball for the next frame
   */
  _setupFrame() {
    // Check horizontal boundries and bounce off bounding box
    if (this.x + this.dx > this.canvasWidth - this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }

    // Check vertical boundries and bound off bounding box (top only)
    if (this.y + this.dy < this.radius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > this.canvasHeight - this.radius) {
      // TODO: Check that ball hit's paddle
      this.dy = -this.dy;
    }

    // Apply directional values
    this.x += this.dx;
    this.y += this.dy;

    // Finally draw the ball
    this._render();
  }

  /**
   * Draw the ball on the canvas
   */
  _render() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }

  /**
   * Calculate the next frame and update the ball
   */
  draw() {
    this._setupFrame();
  }
}

export default Ball;
