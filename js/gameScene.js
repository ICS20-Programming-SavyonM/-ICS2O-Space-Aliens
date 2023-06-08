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

  //create aliens
  const alienXLocation = Math.floor(Math.random() * 1920) + 1 //this will get a number between 1 and 1920
  let alienXVelocity = Math.floor(Math.random() * 50) +1 //this will get a number between 1 and 50 
  alienXVelocity *= Math.round(Math.random()) ? 1 : -1 //this will add minus sign in 50% of cases
  const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
  anAlien.body.velocity.y = 200
  anAlien.body.velocity.x = alienXVelocity
  this.alienGroup.add(anAlien)
}

  // This is the constructor
  constructor() {
    super({ key: 'gameScene' })
      this.background = null
      this.ship = null
      this.fireMissile = false
      this.scoreText = null
      this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center'}
  }

  //set background color
   init(data) {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  preload() {
    console.log('Game Scene');

    // Load images for the game scene
    this.load.image('spaceBackground', 'images/spacebackground.png');
    this.load.image('ship', 'images/spaceship.png');
    this.load.image('missile', 'images/missile.gif');
    this.load.image('alien', 'images/ufo.png')
    //sound
    this.load.audio('blast', 'sounds/blast.mp3')
    this.load.audio('explosion', 'sounds/explode.wav')
  }

  //set specifications for the images
  create(data) {
    this.background = this.add.image(0, 0, 'spaceBackground').setScale(2.0);
    this.background.setOrigin(0, 0);

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.3); // Set spaceship size to 0.3

    // Create a group for the missiles
   this.missileGroup = this.physics.add.group();
  

  // Create a group for the aliens
this.alienGroup = this.add.group()
this.createAlien()

// Collisions between missiles and aliens 
this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
  alienCollide.destroy()
  missileCollide.destroy()
  this.sound.play('explosion')
  this.score = this.play('explosion')
  this.score = this.score + 1
  this.scoreText.setText('Score:' + this.score.toString())
  this.createAlien()
  this.createAlien()
}.bind(this))
}

  //controls for the spaceship
  update(time, delta) {
  const keyLeftObj = this.input.keyboard.addKey('LEFT');
  const keyRightObj = this.input.keyboard.addKey('RIGHT');
  const keySpaceObj = this.input.keyboard.addKey('SPACE');

  if (keyLeftObj.isDown == true) {
    this.ship.x -= 15;
    if (this.ship.x < 0) {
      this.ship.x = this.cameras.main.width; // Wrap to the right side of the screen
    }
  }

  if (keyRightObj.isDown == true) {
    this.ship.x += 15;
    if (this.ship.x > this.cameras.main.width) {
      this.ship.x = 0; // Wrap to the left side of the screen
    }
  }

  if (keySpaceObj.isDown == true) {
    if (this.fireMissile == false) {
      
      // Fire the missile
      this.fireMissile = true;
      const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile').setScale(0.5);
      this.missileGroup.add(aNewMissile);
      this.sound.play('blast')
    }
  }

  if (keySpaceObj.isUp == true) {
    this.fireMissile = false;
    }
  }
}

this.missileGroup.children.each(function (item) {
  item.y = item.y - 15
  if (item.y < 0) {
    item.destroy()
  }
}

export default GameScene;