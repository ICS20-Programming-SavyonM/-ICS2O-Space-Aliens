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
       this.fireMissile
  }

   init(data) {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  preload() {
    console.log('Game Scene');

    // Load images for the game scene
    this.load.image('spaceBackground', 'assets/spacebackground.png');
    this.load.image('ship', 'assets/spaceship.png');
    this.load.image('bullet', 'assets/bullet.png');
  }

  create(data) {
    this.background = this.add.image(0, 0, 'spaceBackground').setScale(2.0);
    this.background.setOrigin(0, 0);

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.3); // Set spaceship size to 0.3

    // Create a group for the missiles
   this.missileGroup = this.physics.add.group();
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT');
    const keyRightObj = this.input.keyboard.addKey('RIGHT');
    const keySpaceObj = this.input.keyboard.addKey('SPACE');

    if (keyLeftObj.isDown == true) {
      this.ship.x -= 15;
      if (this.ship.x < 0) {
        this.ship.x = 0;
      }
    }

    if (keyRightObj.isDown == true) {
      this.ship.x += 15;
      if (this.ship.x > 1920) {
        this.ship.x = 1920;
      }
    }

    if (keySpaceObj.isDown == true) {
      if (this.fireMissile == false) {
        // Fire the missile
        this.fireMissile = true;
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile');
        this.missileGroup.add(aNewMissile);
      }
    }

    if (keySpaceObj.isUp == true) {
      this.fireMissile = false;
    }
  }
}

export default GameScene;