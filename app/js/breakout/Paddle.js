class Paddle {
  /**
   * Represents the Paddle
   * @constructor
   * @param {string} color - Fill color of ball
   */
  constructor(color = '#000') {
    this.color = color;
    this.width = 75;
    this.height = 10;
    this.move = false;
    this.dx = 10; // The value to add or remove from x-axis coord of the paddle
    this.events = {
      reset: new Event('reset')
    };
  }

  /**
   * Initialise class
   * @param {object} context - The canvas context on which to draw
   * @param {int} canvasWidth -  Width of canvas
   * @param {int} canvasHeight - Height of canvas
   */
  init(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = (this.canvasWidth - this.width) / 2;
    this.y = this.canvasHeight - this.height;

    this._bindEvents();
  }

  /**
   * Bind the paddle events
   */
  _bindEvents() {
    document.addEventListener('reset', this.reset.bind(this), false);
  }

  /**
   * Calculate the position of the paddle for the next frame
   */
  _frameSetup() {
    if (this.move !== false) {
      if (this.move === 'left') {
        // Decrease the paddle's location on the x-axis or set to 0 if resulting
        // value is negative
        if (this.x - this.dx > 0) {
          this.x -= this.dx;
        } else {
          this.x = 0;
        }
      }

      if (this.move === 'right') {
        // Increase the paddle's location on the x-axis or set to maximum value
        // if resulting value is too large
        if (this.x + this.dx + this.width < this.canvasWidth) {
          this.x += this.dx;
        } else {
          this.x = this.canvasWidth - this.width;
        }
      }
    }

    // Finally draw the paddle
    this._render();
  }

  /**
   * Draw the paddle on the canvas
   */
  _render() {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }

  reset() {
    this.x = (this.canvasWidth - this.width) / 2;
  }

  /**
   * Calculate the next frame and update the paddle
   */
  draw() {
    this._frameSetup();
  }
}

export default new Paddle();
