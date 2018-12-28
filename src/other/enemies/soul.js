import Enemy from './enemy'
import Player from '../player';

export default class Soul extends Enemy {
  constructor(game) {
    super(game, 'soul')
    
    this.body.allowGravity = true;
    this.body.immovable = false;

    this.vulnerabilities = {
      gun: 0.8,
      bomb: 10
    };

    this.settings = {
      patrollL: 0,
      patrollR: 0
    }

    this.height = 71;
    this.width = 53;
  }

  hit(bullet) {
    if (this.dying) {
      return
    }

    if (bullet.bulletType == 'gun') {
      this.health -= this.vulnerabilities.gun;
    } else if (bullet.bulletType == 'bomb' && bullet.exploded == true) {
      this.health -= this.vulnerabilities.bomb;
    }

    if (this.health < 0) {
      this.dying = true;
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.body.allowGravity = false;
      this.death();
    }
  }

  spawn(x, y, data) {
    this.stdReset(x, y);
    this.body.velocity.x = 80;
    this.settings = {
      patrollL: data.patrollL,
      patrollR: data.patrollR
    };
  }

  update() {
    if (this.x + (this.width/2) >= this.settings.patrollR) {
      this.body.velocity.x = -80;
    }
    if (this.x <= this.settings.patrollL + (this.width/2)) {
      this.body.velocity.x = 80;
    }
    // this.body.velocity.x = Math.sin(this.game.time.now/500)*100+(player.x-this.x)*500;
    // this.body.velocity.y = Math.cos(this.game.time.now/1000)*100
  }

}