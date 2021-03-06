import Ball from './Ball';
import Paddle from './Paddle';

class User {
  /**
   * Represents the User
   * @constructor
   */
  constructor() {
    this.lives = 3;
    this.events = {
      loseLife: new Event('loseLife')
    };

    this._bindEvents();
  }

  /**
   * Bind the user events
   */
  _bindEvents() {
    document.addEventListener('loseLife', this.loseLife.bind(this), false);
  }

  /**
   * Deduct a life and reset our game
   */
  loseLife() {
    if (this.lives > 0) {
      this.lives = this.lives - 1;

      if (this.lives === 0) {
        console.log('Game over');
        document.dispatchEvent(Ball.events.clear);
      } else {
        console.log('Lives remaining: ', this.lives);
        document.dispatchEvent(Ball.events.reset);
        document.dispatchEvent(Paddle.events.reset);
      }
    }
  }
}

export default new User();
