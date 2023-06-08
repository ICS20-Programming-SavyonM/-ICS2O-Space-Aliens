/* global Phaser */ 

// Copyright (c) 2023 Savyon All rights reserved
//
// Created by: Savyon
// Created on: May 2023
// This is the game scene

/** 
* This class is the game scene
*/
class GameScene extends Phaser.Scene {
  //this is the constructor
  constructor() {
    super({ key: 'gameScene' });

    // Game scene variables
    this.background = null;
    this.ship = null;
    this.fireMissile = false;
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = {
      font: '65px Arial',
      fill: '#ffffff',
      align: 'center',
    };
    this.spaceKeyObj = null; // Reference for the space key object
  }

  init(data) {
    // Set the background color of the game scene
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  preload() {
    
    // Load game assets
    console.log('Game Scene');
    this.load.image('spaceBackground', 'images/spacebackground.png');
    this.load.image('ship', 'images/spaceship.png');
    this.load.image('missile', 'images/missile.gif');
    this.load.image('alien', 'images/ufo.png');
    this.load.audio('blast', 'sounds/blast.mp3');
    this.load.audio('explosion', 'sounds/explode.wav');
  }

  create() {
    // Create game objects and initialize variables

    // Create and set the background image
    this.background = this.add.image(0, 0, 'spaceBackground').setScale(2.0);
    this.background.setOrigin(0, 0);

    // Create and set the score text
    this.scoreText = this.add.text(
      10,
      10,
      'Score: ' + this.score.toString(),
      this.scoreTextStyle
    );

    // Create the spaceship
    this.ship = this.physics.add
      .sprite(1920 / 2, 1080 - 100, 'ship')
      .setScale(0.3);

    // Create a group for the missiles
    this.missileGroup = this.physics.add.group();

    // Create a group for the aliens
    this.alienGroup = this.add.group();

    // Create an alien
    this.createAlien();

    // Add collision detection between missiles and aliens
    this.physics.add.collider(
      this.missileGroup,
      this.alienGroup,
      function (missileCollide, alienCollide) {
        // Destroy the alien and missile
        alienCollide.destroy();
        missileCollide.destroy();

        // Play explosion sound
        this.sound.play('explosion');

        // Update the score
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score.toString());

        // Create new aliens
        this.createAlien();
        this.createAlien();
      }.bind(this)
    );

    // Create the space key object
    this.spaceKeyObj = this.input.keyboard.addKey('SPACE');
  }

  update(time, delta) {
    // Handle user input and game logic in each frame

    // Get the left and right arrow key objects
    const keyLeftObj = this.input.keyboard.addKey('LEFT');
    const keyRightObj = this.input.keyboard.addKey('RIGHT');

    // Move the spaceship left or right based on the arrow key input
    if (keyLeftObj.isDown == true) {
      this.ship.x -= 15;
      if (this.ship.x < 0) {
        this.ship.x = this.cameras.main.width;
      }
    }

    if (keyRightObj.isDown == true) {
      this.ship.x += 15;
      if (this.ship.x > this.cameras.main.width) {
        this.ship.x = 0;
      }
    }

    // Check for space key press
    if (Phaser.Input.Keyboard.JustDown(this.spaceKeyObj)) {
      if (this.fireMissile === false) {
        // Fire the missile
        this.fireMissile = true;
        const aNewMissile = this.physics.add
          .sprite(this.ship.x, this.ship.y, 'missile')
          .setScale(0.5);
        this.missileGroup.add(aNewMissile);
        this.sound.play('blast');
      }
    }

    // Check for space key release
    if (this.spaceKeyObj.isUp == true) {
      this.fireMissile = false;
    }

    // Update the position of missiles and destroy them if they go off-screen
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    });
  }

  createAlien() {
    // Create a new alien

    // Generate random X location and velocity for the alien
    const alienXLocation = Math.floor(Math.random() * 1920) + 1;
    let alienXVelocity = Math.floor(Math.random() * 50) + 1;
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1;

    // Create the alien sprite and set its velocity
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien');
    anAlien.body.velocity.y = 200;
    anAlien.body.velocity.x = alienXVelocity;

    // Add the alien to the alien group
    this.alienGroup.add(anAlien);
  }
}

export default GameScene;
