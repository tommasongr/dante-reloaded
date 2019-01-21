export default class Bullet extends Phaser.Sprite {
  constructor(game, bulletType) {
    super(game, 0, 0, 'bullet')

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this.anchor.set(0.5, 0.5);

    this.game.physics.enable(this);
    this.game.physics.arcade.gravity.y = 250;
    this.body.allowGravity = false;
    this.body.immovable = false;

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

    this.bulletType = bulletType

    this.sfxBullet = this.game.add.audio('bullet')
    this.game.sound.setDecodedCallback([ this.sfxBullet ], function(){
      console.log('audio ready')
    }, this);
  }

  fire(x, y, angle, speed, gx, gy) {
    gx = gx || 0;
    gy = gy || 0;

    this.exists = true;
    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    // if (angle == 0) {
    //   this.angle = -175;
    // };

    this.body.gravity.set(gx, gy);

    this.sfxBullet.play()
  }

  update() {
    if (this.tracking) {
      this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0) {
      this.scale.x += this.scaleSpeed;
      this.scale.y += this.scaleSpeed;
    }
  }
}