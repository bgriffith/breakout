import Particle from './Particle';

class Particles {
  constructor(context, brick) {
    this.context = context;
    this.brick = brick;
    this.particles = [];
    this.maxDistance = 20;
    this.particleCount = 8;
    this.distanceCounter = 0;

    this._init();
  }

  _init() {
    this._setupParticles();
  }

  _setupParticles(currentParticleId = 0) {
    let particleId = currentParticleId;

    this.particles[particleId] = this._setupParticle(this.brick);

    if (particleId < this.particleCount - 1) {
      particleId++;
      this._setupParticles(particleId);
    }

    return true;
  }

  _setupParticle(brick) {
    return new Particle(this.context, brick);
  }

  _setupFrame() {
    if (this.particles.length > 0) {
      for (let i = 0; i < this.particles.length; i++) {
        if (this.distanceCounter < this.maxDistance) {
          this.particles[i].draw();
        }
      }

      this.distanceCounter++;
    }
  }

  draw() {
    this._setupFrame();
  }
}

export default Particles;
