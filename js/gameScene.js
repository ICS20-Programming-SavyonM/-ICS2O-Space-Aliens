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

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('gameScene')
  }

  create(data) {
    // Add your code to create game objects here
  }

  update(time, delta) {
    // Add your code to update game objects here
  }
}

export default GameScene;
