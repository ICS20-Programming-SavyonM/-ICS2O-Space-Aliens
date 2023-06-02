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
  
  /** 
  * This method is the constructor
  */
  constructor() {
    super({ key: "menuScene" })
    
  this.menuSceneBackgroundImage = null
    this.startButton = null
  }

  /** 
  * Can be defined on your own scenes
  * This method is called the scene Manager when the scene starts 
  * before preload() and create()
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start()
  */
  init(data) {
  this.cameras.main.setBackgroundColor("ffffff")
  }

  /** 
  * Can be defined on your own scenes
  * Use it to load assets
  */
  preload () {
    console.log('Menu Scene')

    this.load.image('menuSceneBackground', 'assets/aliens_screen_image2.jpg')
    this.load.image('startButton', 'assets/start.png')
  }

  //specifications for image
  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
  }

  /** 
  * Can be defined on your own scenes
  * Use it to create game objects
  * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start()
  */
  create(data) {
    // Add your code to create game objects here
  }

  /** 
  * Should be overridden by your own scenes
  * This method is called per game step while the scene is running
  * @param {number} time - Current time
  * @param {number} delta - The delta time in ms since the last frame
  */
  update(time, delta) {
    // Add your code to update game objects here
  }
}
export default MenuScene;
