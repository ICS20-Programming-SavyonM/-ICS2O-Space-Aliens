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
  }

  this.background = null
  this.ship = null

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Game Scene')
  }

  create(data) {
    // Add your code to create game objects here
    this.background = this.add.image(0, 0 'starBackground').setScale(2.0)
    this.background.setOrigin(0, 0)
  }

  this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')
}

  update(time, delta) {
    // called 60 times a second
  }

const keyLeftObj = this.input.keyboard.addKey('LEFT')
const keyRightObj = this.input.keyboard.addKey('RIGHT')

if (keyLeftObj.isDown == true) {
  this.ship.x -= 15
  if (this.ship.x < 0) {
    this.ship.x = 0
  }
}

if (KeyRightObj.isDown == true) {
  this.ship.x += 15
  if (this.ship.x > 1920) {
    this.ship.x = 1920
      }
    }
  }
}


export default GameScene;
