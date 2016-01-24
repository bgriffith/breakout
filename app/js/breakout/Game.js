import Stage from './Stage';
import Bricks from './Bricks';
import Ball from './Ball';
import Paddle from './Paddle';
import CollisionDetection from './CollisionDetection';

class Game {
  /**
   * Constructor of Game
   * @constructor
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
    this.bricks = null;
    this.collisionDetection = null;
  }

  /**
   * Run through the various game setups
   */
  _setup() {
    this.wrapper = this._setupWrapper();
    this.canvas = this._setupCanvas();
    this.context = this._setupCanvasContext();
    this.stage = this._setupStage();
    this.bricks = this._setupBricks();
    this._setupPaddle();
    this._setupBall();
    this.collisionDetection = this._setupCollisionDetection();
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
   * Create the bricks
   * @returns {object} Bricks instance
   */
  _setupBricks() {
    return new Bricks(this.context);
  }

  /**
   * Create the paddle
   */
  _setupPaddle() {
    Paddle.init(this.context, this.width, this.height);
  }

  /**
   * Create the ball
   */
  _setupBall() {
    Ball.init(this.context, this.width, this.height);
  }

  /**
   * Create the collision detection
   * @returns {object} Collision detection instance
   */
  _setupCollisionDetection() {
    return new CollisionDetection();
  }

  /**
   * Bind required event handlers to our document object
   */
  _bindEvents() {
    document.addEventListener('keydown', this._keydownHandler.bind(this), false);
    document.addEventListener('keyup', this._keyupHandler.bind(this), false);
  }

  /**
   * Keydown event handler
   * @param {object} event - The keydown event object
   */
  _keydownHandler(event) {
    let keyCode = event.keyCode;

    // Left arrow key
    if (keyCode === 37) {
      Paddle.move = 'left';
    }

    // Right arrow key
    if (keyCode === 39) {
      Paddle.move = 'right';
    }
  }

  /**
   * Keyup event handler
   * @param {object} event - The keyup event object
   */
   _keyupHandler(event) {
     let keyCode = event.keyCode;

     // Left arrow key
     if (keyCode === 37 || keyCode === 39) {
       Paddle.move = false;
     }
   }

  /**
   * Render all elements
   */
  _render() {
    // Draw the game's stage
    this.stage.draw();

    // Draw the game's bricks
    this.bricks.draw();

    // Draw the game's ball
    Ball.draw();

    // Draw the game's paddle
    Paddle.draw();

    // Run collision detection
    this.collisionDetection.run(this.bricks, this.ball);

    // Create the game loop
    window.requestAnimationFrame(this._render.bind(this));
  }

  /**
   * Initialize game
   */
  init() {
    // Setup game
    this._setup();

    // Bind required events
    this._bindEvents();

    // Append to wrapper to make visible
    this.wrapper.appendChild(this.canvas);

    // Render game
    this._render();
  }
}

export { Game };
