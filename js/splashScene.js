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
  }
}

/** 
* This method is called by the scene manager when the scene starts 
* before preload() and create()
* @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start()
*/
init(data) {
  this.cameras.main.setBackgroundColor("ffffff")
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