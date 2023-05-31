/* global Phaser */ 

// Copyright (c) 2023 Savyon All rights reserved
//
// Created by: Savyon
// Created on: May 2023
// This file contains the JS functions for index.html

//Game scene
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics : {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },

  //Set background color
  backgroundColor: 0x5f6e7a,
  scale: {
  mode: Phaser.Scale.FIT,
  //place in the middle of page
  autoCenter: Phaser.Scale.CENTER_BOTH
  }
} 

const game = new Phaser.Game(config)
console.log(game)