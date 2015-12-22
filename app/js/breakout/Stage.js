class Stage {
  /**
   * Represents the Stage
   * @constructor
   * @param {object} context - The canvas context on which to draw
   * @param {int} width -  Width of stage
   * @param {int} height - Height of stage
   * @param {string} backgroundColor - Fill color of stage
   */
  constructor(context, width, height, backgroundColor) {
    this.width = width;
    this.height = height;
    this.context = context;
    this.backgroundColor = backgroundColor;
  }

  /**
   * Draw the stage
   */
  draw() {
    this.context.beginPath();
    this.context.rect(0, 0, this.width, this.height);
    this.context.fillStyle = this.backgroundColor;
    this.context.fill();
    this.context.closePath();
  }
}

export default Stage;
