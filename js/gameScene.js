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
  // This is the constructor
  constructor() {
    super({ key: 'gameScene' })
      this.background = null
      this.ship = null
      this.fireMissile = false
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
  }

  //set specifications for the images
  create(data) {
    this.background = this.add.image(0, 0, 'spaceBackground').setScale(2.0);
    this.background.setOrigin(0, 0);

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.3); // Set spaceship size to 0.3

    // Create a group for the missiles
   this.missileGroup = this.physics.add.group();
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
    }
  }

  if (keySpaceObj.isUp == true) {
    this.fireMissile = false;
    }
  }
}

export default GameScene;