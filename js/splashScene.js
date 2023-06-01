/* global Phaser */ 

// Copyright (c) 2023 Savyon All rights reserved
//
// Created by: Savyon
// Created on: May 2023
// This is the splashscene

/** 
* This class is the spalsh scene
*/
class SplashScene extends Phaser.Scene {
  /** 
* This method is the constructor
*/
  constructor() {
    super({key: "splashScene"})
    this.splashSceneBackgroundImage = null
  }
}

/** 
* This method is called by the scene manager when the scene starts 
* before preload() and create()
* @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start()
*/
init(data) {
  this.cameras.main.setBackgroundColor("ffffff")
  this.load.image("splashSceneBackground", "./assets/splashSceneImage.png")
}

/** 
* Can be defined on your own scenes
* Use it to create your own game objects
* @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start()
*/
create(data) {
  this.splashSceneBackgroundImage = this.add.sprite(
    0,
    0,
     "splashSceneBackground"
  )
  this.splashSceneBackgroundImage.x = 1920 / 2
  this.splashSceneBackgroundImage.y = 1080 / 2
}

/** 
* Should be overridden by your own scenes
* This method is called per game step while the scene is running
* @param {number} time - Current time
* @param {number} delta - The delta time in ms since the last frame
*/
update(time, delta) {
  if (time > 3000) {
    this.scene.switch("titleScene")
    }
  }
}

 /** 
* Use to load assets
*/
preload() {
  console.log("Splash Scene")
}

/** 
* Use to create game objects
@param {object} data -  Any data passed via ScenePlugin.add() or ScenePlugin.start()
*/
create(data) {
  //pass
  }
}

export default SplashScene