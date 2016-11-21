import { Sprite, Physics } from 'phaser'
import { LEFT, RIGHT, JUMP, THROW_CARD, USE_CARD } from './Input'
import ThrownCardWeapon from './ThrownCardWeapon'

export const Constants = {
	gravity: 450,
	walkSpeed: 350,
	jumpSpeed: -400,
	semiAutoWindow: 75
}

export default class Player extends Sprite {
	
	static preload(load) {
		load.image('player', 'assets/img/test player.png')	
	}

	constructor(game, x, y, input) {
		super(game, x, y, 'player')
		this.input = input

		this.facing = 'right' 
		this.jumpTimer = 0

		this.anchor.setTo(0.5, 0)

		game.physics.enable(this, Physics.ARCADE)
		this.body.gravity.y = Constants.gravity
		this.body.collideWorldBounds = true

		this.weapon = new ThrownCardWeapon(this)
	}

	think() {
		const body = this.body,
			  input = this.input;

		if(this.jumpTimer > 0) this.jumpTimer -= this.game.time.physicsElapsedMS

		body.velocity.x = 0;
		if(input[LEFT].isDown) {
			body.velocity.x = -Constants.walkSpeed
			
			if(this.facing !== 'left') {
				this.scale.x = -1
				this.facing = 'left'
			}
		}
		else if (input[RIGHT].isDown) {
			body.velocity.x = Constants.walkSpeed
			
			if(this.facing !== 'right') {
				this.scale.x = 1
				this.facing = 'right'
			}
		}

		if(input[JUMP].isDown && body.onFloor() && this.jumpTimer <= 0) {
			body.velocity.y = Constants.jumpSpeed
			this.jumpTimer = 750
		}

		if(this.weapon.canFire && 
		   input[THROW_CARD].isDown && 
		   input[THROW_CARD].duration <= Constants.semiAutoWindow) 
		{
		 	this.weapon.fire()  
		}

		this.weapon.think()
	}
}
