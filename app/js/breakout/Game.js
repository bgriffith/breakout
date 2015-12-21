'use strict';

import Stage from './Stage';

class Game {
  /**
   * Constructor of Game
   * @param {int} width - Width of canvas
   * @param {int} height - Height of canvas
   * @param {string} id - Id of parent wrapper
   * @param {string} backgroundColor - Color of the stage's background
   */
  constructor(width = 480, height = 320, id = 'game', backgroundColor = '#e4e4e4') {
    this.id = id;
    this.backgroundColor = backgroundColor;
    this.width = width;
    this.height = height;
    this.canvas = null;
    this.context = null;
    this.stage = null;
    this.wrapper = null;
  }

  /**
   * Run through the various game setups
   */
  _setup() {
    this.wrapper = this._setupWrapper();
    this.canvas = this._setupCanvas();
    this.context = this._setupCanvasContext();
    this.stage = this._setupStage();
  }

  /**
   * Set canvas wrapper
   * @returns {object|null} wrapper element
   */
  _setupWrapper() {
    return document.getElementById(this.id) || null;
  }

  /**
   * Create the canvas and append to parent wrapper
   * @returns {object} canvas element
   */
  _setupCanvas() {
    let canvasElement = document.createElement('canvas');

    // Assign canvas properies
    canvasElement.width = this.width;
    canvasElement.height = this.height;

    return canvasElement;
  }

  /**
   * Get and store canvas context
   * @returns {object} canvas context
   */
  _setupCanvasContext() {
    return this.canvas.getContext('2d');
  }

  /**
   * Create the stage
   * @returns {object} Stage instance
   */
  _setupStage() {
    return new Stage(this.context, this.width, this.height, this.backgroundColor);
  }

  /**
   * Render all elements
   */
  _render() {
    // Draw the game's stage
    this.stage.draw();

    // Append to wrapper to make visible
    this.wrapper.appendChild(this.canvas);
  }

  /**
   * Initialize game
   */
  init() {
    // Setup game
    this._setup();

    // Render game
    this._render();
  }
}

export { Game };