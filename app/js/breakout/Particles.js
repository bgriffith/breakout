import Particle from './Particle';

class Particles {
  /**
   * Represents the Particles
   * @constructor
   * @param {object} context - The canvas context on which to draw
   * @param {object} brick -  The parent brick
   */
  constructor(context, brick) {
    this.context = context;
    this.brick = brick;
    this.particles = [];
    this.maxDistance = 20;
    this.particleCount = 8;
    this.distanceCounter = 0;

    this._init();
  }

  /**
   * Build an array of particles
   */
  _init() {
    this._setupParticles();
  }

  /**
   * Recursively setup the particles
   * @param {int} [currentParticleId=0] - Id of particle
   * @returns {bool} true - Returns true once complete
   */
  _setupParticles(currentParticleId = 0) {
    let particleId = currentParticleId;

    this.particles[particleId] = this._setupParticle(this.brick);

    if (particleId < this.particleCount - 1) {
      particleId++;
      this._setupParticles(particleId);
    }

    return true;
  }

  /**
   * Create an Particle instance
   * @param {object} brick - Parent brick
   * @return {object} Instance of Particle
   */
  _setupParticle(brick) {
    return new Particle(this.context, brick);
  }

  /**
   * Loop and draw particles
   */
  _setupFrame() {
    if (this.particles.length > 0) {
      for (let i = 0; i < this.particles.length; i++) {
        // Check if particle has not yet travelled the max distance before they
        // are no longer drawn
        if (this.distanceCounter < this.maxDistance) {
          this.particles[i].draw();
        }
      }

      this.distanceCounter++;
    }
  }

  /**
   * Draw particles
   */
  draw() {
    this._setupFrame();
  }
}

export default Particles;
