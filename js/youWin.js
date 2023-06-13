/* global Phaser */ 

// Copyright (c) 2023 Savyon All rights reserved
//
// Created by: Savyon
// Created on: May 2023
// This is the menu scene

/** 
* This class is the menu scene
*/
class YouWin extends Phaser.Scene {
  constructor() {
    super({ key: "youWin" });

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  preload() {
    console.log('You Win');
    this.load.image('menuSceneBackground', './images/astro.jpeg');
    this.load.audio('Track', 'sounds/SpaceTrack.mp3');
  }

  create(data) {
    const song = this.sound.add('Track');
    song.loop = true;
    song.play();
    
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground');
    this.menuSceneBackgroundImage.setOrigin(0.5);
    this.menuSceneBackgroundImage.setPosition(1920 / 2, 1080 / 2);
  }
}

export default YouWin;
