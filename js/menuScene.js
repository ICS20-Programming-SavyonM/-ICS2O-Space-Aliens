/* global Phaser */ 

// Copyright (c) 2023 Savyon All rights reserved
//
// Created by: Savyon
// Created on: May 2023
// This is the menu scene

/** 
* This class is the menu scene
*/
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  preload() {
    console.log('Menu Scene');
    this.load.image('menuSceneBackground', './images/astro.jpeg');
    this.load.image('startButton', './images/playbutton.png');
    this.load.image('hoverButton', './images/buttoncursor.png');
  }

  create(data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground');
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton');
    this.startButton.setInteractive({ useHandCursor: true });

    // Save the original texture key
    this.startButton.originalTextureKey = this.startButton.texture.key;

    // Event listener for hover in
    this.startButton.on('pointerover', () => {
      this.startButton.setTexture('hoverButton');
    });

    // Event listener for hover out
    this.startButton.on('pointerout', () => {
      this.startButton.setTexture(this.startButton.originalTextureKey);
    });

    // Event listener for click
    this.startButton.on('pointerdown', () => this.clickButton());
  }

  update(time, delta) {
    // Add your code to update game objects here
  }

  clickButton() {
    
    // Handle button click event
    this.scene.start('gameScene');
  }
}

export default MenuScene;