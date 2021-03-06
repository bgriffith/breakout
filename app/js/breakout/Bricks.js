import Brick from './Brick';
import Particles from './Particles';

class Bricks {
  /**
   * Represents the Bricks
   * @constructor
   * @param {object} context - The canvas context on which to draw
   * @param {int} [columnCount=3] - Number of columns in grid of bricks
   * @param {int} [rowCount=3] - Number of rows in grid of bricks
   */
  constructor(context, columnCount = 5, rowCount = 3) {
    this.context = context;
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.bricks = [];

    this._init();
  }

  /**
   * Build an array of bricks
   */
  _init() {
    this._setupColumn();
  }

  /**
   * Recursively setup the columns of the brick's array
   * @param {int} [currentColumnId=0] - Id of column
   * @returns {bool} true - Returns true once complete
   */
  _setupColumn(currentColumnId = 0) {
    let columnId = currentColumnId,
        rowId = 0;

    // Create array for each column to hold rows
    this.bricks[columnId] = [];

    // Recursively setup rows
    this._setupRow(rowId, columnId);

    // If not last column increase index and call itself
    if (columnId < this.columnCount - 1) {
      columnId++;
      this._setupColumn(columnId);
    }

    return true;
  }

  /**
  * Recursively setup a column's rows
  * @param {int} currentRowId - Id of row
  * @param {int} currentColumnId - Id of column
  * @returns {bool} true - Returns true once complete
  */
  _setupRow(currentRowId, currentColumnId) {
    let columnId = currentColumnId,
        rowId = currentRowId;

    // Create an instance of Brick and store it in the bricks array
    this.bricks[columnId][rowId] = this._setupBrick(columnId, rowId);

    // If not last row increase index and call itself
    if (rowId < this.rowCount - 1) {
      rowId++;
      this._setupRow(rowId, columnId);
    }

    return true;
  }

  /**
   * Create a new instance of a Brick at a specific location on the grid
   * @param {int} columnId - A multiplier for the brick's position on the x axis
   * @param {int} rowId - A multiplier for the brick's position on the y-axis
   * @return {object} Instance of Brick
   */
  _setupBrick(columnId, rowId) {
    return new Brick(this.context, columnId, rowId);
  }

  /**
   * Recursively go through the columns of the brick's array
   * @param {int} currentColumnId - Id of column to draw bricks of
   * @returns {bool} true - Returns true once complete
   */
  _drawColumn(currentColumnId = 0) {
    let columnId = currentColumnId,
        rowId = 0;

    // Recursively go through and draw each row
    this._drawRow(rowId, columnId);

    // If not last column increase index and call itself
    if (columnId < this.columnCount - 1) {
      columnId++;
      this._drawColumn(columnId);
    }

    return true;
  }

  /**
   * Recursively draw a column's rows
   * @param {int} currentRowId - Id of row
   * @param {int} currentColumnId - Id of column
   * @returns {bool} true - Returns true once complete
   */
  _drawRow(currentRowId, currentColumnId) {
    let columnId = currentColumnId,
        rowId = currentRowId;

    // Check that brick should be visible and draw
    if (this.bricks[columnId][rowId].status === 1) {
      this.bricks[columnId][rowId].draw();
    } else {
      if (!this.bricks[columnId][rowId].particles) {
        this.bricks[columnId][rowId].particles = new Particles(this.context, this.bricks[columnId][rowId]);
      }
      this.bricks[columnId][rowId].particles.draw();
    }

    // If not last row increase index and call itself
    if (rowId < this.rowCount - 1) {
      rowId++;
      this._drawRow(rowId, columnId);
    }

    return true;
  }

  /**
   * Draw the bricks
   */
  draw() {
    this._drawColumn();
  }
}

export default Bricks;
