/* global Phaser */

// Copyright (c) 2023 Savyon All rights reserved
//
// Created by: Savyon
// Created on: May 2023
// This is the game scene

/** 
 * This class is the game scene
 */
class GameScene extends Phaser.Scene {

  // create an alien
  createAlien () {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1 // this will get a number between 1 and 1920;
    let alienXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50;
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien').setScale(0.5) 
    anAlien.body.velocity.y = 200 
    anAlien.body.velocity.x = alienXVelocity 
    this.alienGroup.add(anAlien) 
  }

  // this is the constructor 
  constructor () {
    super({ key: 'gameScene' })

    this.ship = null
    this.fireMissile = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }

    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#98E483', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')
  }

  preload() {
    
    // Load game assets
    console.log('Game Scene')
    this.load.image('spaceBackground', 'images/spacebackground.png')
    this.load.image('ship', 'images/spaceship.png')
    this.load.image('missile', 'images/missile.gif')
    this.load.image('alien', 'images/ufo.png')
    this.load.audio('blast', 'sounds/blast.mp3')
    this.load.audio('explosion', 'sounds/explode.wav')
    this.load.audio('death', 'sounds/death.wav')
  } 

  create (data) {
    this.background = this.add.image(0, 0, 'spaceBackground').setScale(2.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.3)

    // create a group for the missiles
    this.missileGroup = this.physics.add.group()

    // create a group for the aliens
    this.alienGroup = this.add.group()
    this.createAlien()

    // Collisions between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
      alienCollide.destroy()
      missileCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 1 
      this.scoreText.setText('Score: ' + this.score.toString()) 
      this.createAlien() 
    }.bind(this))

    // Create a new alien after the collision handling
this.time.addEvent({
  delay: 1000, // Adjust the delay as per your preference
  callback: this.createAlien,
  callbackScope: this,
  loop: true
});

    // Collisions between ship and aliens
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      this.sound.play('death')
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()

      // Reset the score to 0
      this.score = 0;
      this.scoreText.setText('Score: ' + this.score.toString());
      
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }.bind(this))
  }

  update(time, delta) {
  const keyLeftObj = this.input.keyboard.addKey('LEFT')
  const keyRightObj = this.input.keyboard.addKey('RIGHT')
  const keySpaceObj = this.input.keyboard.addKey('SPACE')

// Code for ship left with left arrow
if (keyLeftObj.isDown === true) {
  this.ship.setFlipX(true);
  this.ship.x -= 15;
  if (this.ship.x < 0) {
    this.ship.x = 1920;
  }
  this.ship.setScale(-0.3, 0.3);
}

// Code for ship right with right arrow
if (keyRightObj.isDown === trce) {
  this.ship.setFlipX(false);
  this.ship.x += 15;
  if (this.ship.x > 1920) {
    this.ship.x = 0;
  }
  this.ship.setScale(0.3);
}


  if (keySpaceObj.isDown == true) {
    if (this.fireMissile == false) {
      
      // fire missile
      this.fireMissile = true
      const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile').setScale(0.5)
      this.missileGroup.add(aNewMissile)
      this.sound.play('blast')
    }
  }

    if (keySpaceObj.isDown && !this.gameOverText) {
  if (this.fireMissile == false) {
    
    // fire missile
    this.fireMissile = true;
    const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile').setScale(0.5);
    this.missileGroup.add(aNewMissile);
    this.sound.play('blast.');
  }
}

if (keySpaceObj.isUp) {
  this.fireMissile = false;
}

  if (keySpaceObj.isUp == true) {
    this.fireMissile = false
  }

  // Update the position of missiles and destroy them if they go off-screen
  this.missileGroup.children.each(function (item) {
    item.y = item.y - 15
    if (item.y < 50) {
      item.destroy()
    }
  })
  }
}

export default GameScene