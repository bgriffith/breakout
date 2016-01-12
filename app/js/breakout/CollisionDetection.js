import Ball from './Ball';

class CollisionDetection {
  /**
   * Constructor of Collision Detection
   * @constructor
   */
  constructor() {
    this.bricks = null;
    this.columnCount = null;
    this.rowCount = null;
  }

  /**
   * Recursively get the columns of the brick's array
   * @param {int} [currentColumnId=0] - Id of column
   * @returns {bool} true - Returns true once complete
   */
  _getColumn(currentColumnId = 0) {
    let columnId = currentColumnId,
        rowId = 0;

    this._getRow(rowId, columnId);

    // If not last column increase index and call itself
    if (columnId < this.columnCount - 1) {
      columnId++;
      this._getColumn(columnId);
    }

    return true;
  }

  /**
   * Recursively setup a column's rows
   * @param {int} currentRowId - Id of row
   * @param {int} currentColumnId - Id of column
   * @returns {bool} true - Returns true once complete
   */
  _getRow(currentRowId, currentColumnId) {
    let columnId = currentColumnId,
        rowId = currentRowId;

    // Run the collision detection for a specific brick based on it's column and
    // row id
    this._detectCollision(columnId, rowId);

    // If not last row increase index and call itself
    if (rowId < this.rowCount - 1) {
      rowId++;
      this._getRow(rowId, columnId);
    }

    return true;
  }

  /**
   * Detect collision between ball and brick
   * @param {int} columnId - The id of the brick's column
   * @param {int} rowId - The id of the bricks's row
   */
  _detectCollision(columnId, rowId) {
    let brick = this.bricks[columnId][rowId];

    // Only detect collision on visible bricks
    if (brick.status === 1) {
      // Check if ball's x and y are within the coords of a brick
      if (
        Ball.x > brick.x
        && Ball.x < brick.x + brick.width
        && Ball.y > brick.y
        && Ball.y < brick.y + brick.height
      ) {
        Ball.dy = -Ball.dy;

        // Set status to 0 which will hide brick from next frame
        this.bricks[columnId][rowId].status = 0;
      }
    }
  }

  /**
   * Run collision detection
   * @param {object} bricks - The Bricks
   */
  run(bricks) {
    this.bricks = bricks.bricks;
    this.columnCount = bricks.columnCount;
    this.rowCount = bricks.rowCount;

    this._getColumn();
  }
}

export default CollisionDetection;
