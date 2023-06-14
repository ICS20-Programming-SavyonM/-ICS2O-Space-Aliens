/* global Phaser */ 

// Copyright (c) 2023 Savyon All rights reserved
//
// Created by: Savyon
// Created on: May 2023
// This is the instructions scene

/** 
* This class is the menu scene
*/
class instructionsScene extends Phaser.Scene {
  
  // this is the constructor
  constructor() {
    super({ key: "instructionsScene" });

    this.intship = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  preload() {
    this.load.image('intship', './images/interiorship.jpg');
    this.load.audio('Track', 'sounds/SpaceTrack.mp3');
  }

  create(data) {
    const song = this.sound.add('Track');
    song.loop = true;
    song.play();

    this.intship = this.add.image(1920 / 2, 1080 / 2, 'intship');
    this.intship.setOrigin(0.5);
  }
}

export default instructionsScene
