/* global Phaser */ 

// Copyright (c) 2023 Savyon All rights reserved
//
// Created by: Savyon
// Created on: May 2023
// This is the instructions scene

/** 
* This class is the instructions scene
*/
class InstructionsScene extends Phaser.Scene {
  
  // this is the constructor
  constructor() {
    super({ key: "instructionsScene" });

    this.intship = null;
    this.backButton = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  preload() {
    this.load.image('intship', './images/interiorship.jpg');
    this.load.image('backbutton', './images/backbutton.png');
    this.load.audio('star', 'sounds/starboy.mp3');
  }

  create(data) {
    const song = this.sound.add('star');
    song.loop = true;
    song.play();

    this.intship = this.add.image(1920 / 2, 1080 / 2, 'intship');
    this.intship.setOrigin(0.5);

   this.backbutton = this.add.sprite(0, 0, 'backbutton'); 
this.backbutton.setScale(0.3);  // Adjust the scale value to make it smaller
this.backbutton.setOrigin(0, 0);  // Set the origin to the top-left corner
this.backbutton.setInteractive({ useHandCursor: true });
this.backbutton.on('pointerdown', () => this.clickBack());

   const instructionsText = this.add.text(1920 / 2, (1080 / 2) + 200, 'Instructions:\n\nUse the arrow keys to move the spaceship and press space to shoot missiles and hit the enemy aliens. Survive and shoot as many aliens as you can to get a high score.', {
    fontFamily: 'Arial',
    fontSize: 36,
    color: '#ffffff',
    align: 'center',
    wordWrap: { width: 800, useAdvancedWrap: true }
  });
  instructionsText.setOrigin(0.5);
}

  //Go back to menuScene
  clickBack() {
    this.sound.pauseAll();
    this.scene.start('menuScene');
  }
}

export default InstructionsScene;
