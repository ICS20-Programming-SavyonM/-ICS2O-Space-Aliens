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
    super({key: "menuScene"})
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
preload() {
  console.log("Menu Scene")
}

/** 
* Can be defined on your own scenes
* Use it to create game objects
* @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start()
*/
create(data) {
  //pass
}

/** 
* Should be overridden by your own scenes
* This method is called per game step while the scene is running
* @param {number} time - Current time
* @param {number} delta - The delta time in ms since the last frame
*/
update(time, delta) {
  //pass
  }
}

export default MenuScene