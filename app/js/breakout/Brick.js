class Brick {
  /**
   * Represents a Brick
   * @constructor
   * @param {object} context - The canvas context on which to draw
   * @param {int} [columnMultiplier=3] -  Number of columns in grid of bricks
   * @param {int} [rowMultiplier=3] - Number of rows in grid of bricks
   * @param {string} [color=#000] - Fill color of brick
   */
  constructor(context, columnMultiplier = 0, rowMultiplier = 0, color = '#000') {
    this.context = context;
    this.width = 75;
    this.height = 20;
    this.x = 0;
    this.y = 0;
    this.status = 1;
    this.color = color;

    // Position mulitpliers
    this.columnMultiplier = columnMultiplier;
    this.rowMultiplier = rowMultiplier;

    // Position parameters
    this.margin = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;

    // Position brick
    this._position();
  }

  /**
   * Calculate the x coord of the top-left corner of the brick
   * @returns {int} x coord of top-left corner
   */
  _calculateX() {
    return this.columnMultiplier * (this.width + this.margin) + this.offsetLeft;
  }

  /**
   * Calculate the y coord of the top-left corner of the brick
   * @returns {int} y coord of top-left corner
   */
  _calculateY() {
    return this.rowMultiplier * (this.height + this.margin) + this.offsetTop;
  }

  /**
   * Posiiton the brick based on the coords of the top-left corner
   */
  _position() {
    this.x = this._calculateX();
    this.y = this._calculateY();
  }

  /**
   * Draw the brick on the canvas
   */
  draw() {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }
}

export default Brick;
