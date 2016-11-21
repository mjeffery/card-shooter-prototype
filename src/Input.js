import { Keyboard as Keys } from 'phaser'

export const LEFT = 'left'
export const RIGHT = 'right'
export const JUMP = 'jump'
export const THROW_CARD = 'throw_card'
export const USE_CARD = 'use_card'

//TODO add synthetic keys here for binding

export default class Input {
	
	constructor(game) {
		const keyboard = game.input.keyboard

		this.game = game
		Object.assign(this, {
			[LEFT]: keyboard.addKey(Keys.LEFT),
			[RIGHT]: keyboard.addKey(Keys.RIGHT),
			[JUMP]: keyboard.addKey(Keys.Z),
			[THROW_CARD]: keyboard.addKey(Keys.X),
			[USE_CARD]: keyboard.addKey(Keys.C)
		})
	}
}
