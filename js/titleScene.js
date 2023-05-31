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
  super({key: "titleScene"})
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
* Use it to load assets 
*/
preload() {
  console.log("Title Scene")
}

/** 
* Use to create game objects
@param {object} data -  Any data passed via ScenePlugin.add() or ScenePlugin.start()
*/
create(data) {
  //pass
  }
}

/** 
* Should be overridden by your own scenes
* @param {number} time - The current time 
* @param {number} delta - The delta time in ms since the last frame 
*/
update(time, delta) {
  //pass 
  }
}
 


export default TitleScene