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
  constructor() {
    super({ key: 'gameScene' })

    this.ship = null
    this.fireMissile = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
    this.timerText = null
    this.timerTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }

    this.timer = null
    this.remainingTime = 60
    this.isGameOver = false
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')
  }

  preload() {
    // Load game assets
    console.log('Game Scene')
    this.load.image('spaceBackground', 'images/spacebackground.png')
    this.load.image('ship', 'images/spaceship.png')
    this.load.image('missile', 'images/missile.gif')
    this.load.image('alien', 'images/ufo.png')
    this.load.audio('blast', 'sounds/blast.mp3')
    this.load.audio('explosion', 'sounds/explode.wav')
    this.load.audio('death', 'sounds/death.wav')
  }

  create(data) {
    this.background = this.add.image(0, 0, 'spaceBackground').setScale(2.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    this.timerText = this.add.text(1920 - 10, 10, 'Time: ' + this.remainingTime.toString(), this.timerTextStyle)
      .setOrigin(1, 0)
      .setScrollFactor(0)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship').setScale(0.3)

    this.missileGroup = this.physics.add.group()
    this.alienGroup = this.add.group()
    this.createAlien()

    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
      alienCollide.destroy()
      missileCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createAlien()
    }.bind(this))

    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      this.sound.play('death');
      this.physics.pause();
      alienCollide.destroy();
      shipCollide.destroy();
      this.stopTimer(); // Stop the timer
      this.scene.start('youWinScene'); // Switch to YouWinScene
    }.bind(this));

    this.startTimer();
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

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

    if (keySpaceObj.isDown == true) {
      if (this.fireMissile == false) {
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile').setScale(0.5)
        this.missileGroup.add(aNewMissile)
        this.sound.play('blast')
      }
    }

    if (keySpaceObj.isUp == true) {
      this.fireMissile = false
    }

    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15;
      if (item.y < 50) {
        item.destroy();
      }
    })

    if (this.isGameOver) {
      return;
    }

    this.remainingTime -= delta / 1000;
    this.timerText.setText('Time: ' + Math.ceil(this.remainingTime).toString());

    if (this.remainingTime <= 0) {
      this.stopTimer();
      this.isGameOver = true;
      this.scene.start('youWinScene'); // Switch to YouWinScene
    }
  }

  createAlien() {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1
    let alienXVelocity = Math.floor(Math.random() * 50) + 1
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien').setScale(0.5)
    anAlien.body.velocity.y = 200
    anAlien.body.velocity.x = alienXVelocity
    this.alienGroup.add(anAlien)
  }

  startTimer() {
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    })
  }

  stopTimer() {
    if (this.timer !== null) {
      this.timer.remove()
      this.timer = null
    }
  }

  updateTimer() {
    if (this.remainingTime > 0) {
      this.remainingTime -= 1;
      this.timerText.setText('Time: ' + Math.ceil(this.remainingTime).toString());
    }
  }
}

export default GameScene;
