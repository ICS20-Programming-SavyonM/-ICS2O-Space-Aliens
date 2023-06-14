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
  
  // this is the constructor
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
    this.instructionsButton = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  preload() {
    console.log('Menu Scene');
    this.load.image('menuSceneBackground', './images/astro.jpeg');
    this.load.image('startButton', './images/playbutton.png');
    this.load.image('hoverButton', './images/buttoncursor.png');
    this.load.image('instructionsButton', './images/instructions.png'); 
    this.load.audio('Track', 'sounds/SpaceTrack.mp3');
  }

  create(data) {
    const song = this.sound.add('Track');
    song.loop = true;
    song.play();

    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground');
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton');
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.originalTextureKey = this.startButton.texture.key;
    this.startButton.on('pointerover', () => {
      this.startButton.setTexture('hoverButton');
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setTexture(this.startButton.originalTextureKey);
    });
    this.startButton.on('pointerdown', () => this.clickButton());

    this.instructionsButton = this.add.sprite(50, 150, 'instructionsButton'); // Updated sprite variable name
    this.instructionsButton.setInteractive({ useHandCursor: true });
    this.instructionsButton.on('pointerdown', () => this.clickInstructions()); // Updated method call
  }

  update(time, delta) {}

  clickButton() {
    this.scene.start('gameScene');
  }
  
  clickInstructions() {
    this.scene.start('instructionsScene');
  }
}

export default MenuScene
