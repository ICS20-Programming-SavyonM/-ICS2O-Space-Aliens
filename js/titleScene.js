/* global Phaser */

// Copyright (c) 2023 Savyon All rights reserved
//
// Created by: Savyon
// Created on: May 2023
// This is the title scene

/**
 * This class is the title scene
 */
class TitleScene extends Phaser.Scene {
  /**
   * This method is the constructor
   */
  constructor() {
    super({ key: 'titleScene' })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '200px Times', fill: '#AED6F1', align: 'center' }
  }

  //set background color
  init(data) {
  this.cameras.main.setBackgroundColor('#ffffff')
  }

  // show image when game loaded
  preload() {
    console.log('Title Scene')
    this.load.image('titleSceneBackground', './images/spacebackground.jpeg')
  }

  // set specifications for the image
  create(data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(2.75)
      
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Galactic Shooters', this.titleSceneTextStyle).setOrigin(0.5)
  }

  //switch to menuScene
update(time, delta) {
  if (time > 6000) {
    this.scene.switch('menuScene');
    }
  }
}

export default TitleScene