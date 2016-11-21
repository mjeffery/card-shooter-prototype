import { Point, Group } from 'phaser'
import ThrownCard from './ThrownCard'

export const Constants = {
	offset: new Point(32, 64),
	speed: 800,
	rotation: 720,
	shotDelay: 200
}

export default class ThrownCardWeapon {
	
	constructor(player) {
		this.player = player
		const game = this.game = player.game

		this._fireTimer = 0
		
		const bullets = this.bullets = game.add.group()
		bullets.classType = ThrownCard
		bullets.createMultiple(5)
	}

	get canFire() {
		return this._fireTimer <= 0	
	}

	think() {
		if(this._fireTimer > 0)
			this._fireTimer -= this.game.time.physicsElapsedMS
	}

	fire() {
		if(!this.canFire) return

		let player = this.player,
			position = player.body.position,
			x = position.x,
			y = position.y + Constants.offset.y,
			speed, rotation;

		if(player.facing == 'left') {
			x -= Constants.offset.x
			speed = -Constants.speed
			rotation = -Constants.rotation
		} 
		else {
			x += Constants.offset.x
			speed = Constants.speed
			rotation = Constants.rotation
		}
		
		let bullet = this.bullets.getFirstExists(false, true, x, y)
		bullet.body.velocity.x = speed
		bullet.body.angularVelocity = rotation

		this._fireTimer = Constants.shotDelay

		return bullet
	}
}
