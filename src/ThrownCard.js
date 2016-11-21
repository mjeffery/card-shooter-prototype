import { Sprite, Physics } from 'phaser'

export const Constants = {
	lifespan: 5000
}

export default class ThrownCard extends Sprite {
	
	static preload(load) {
		load.image('thrown card', 'assets/img/test card back.png')
	}

	constructor(game, x, y) {
		super(game, x, y, 'thrown card')	
		this.anchor.setTo(0.5, 0.5)
		this.lifespan = Constants.lifespan

		game.physics.enable(this, Physics.ARCADE)
		this.body.setSize(20, 32, -10, -16)
	}

	reset(x, y, health) {
		super.reset(x, y, health)
		this.body.angle = 0
		this.lifespan = Constants.lifespan
	}
}
