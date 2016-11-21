import Game from './Game'
import Player from './Player'
import ThrownCard from './ThrownCard'

export default class Preload {
	preload() {
		const load = this.load,
			  add = this.add;

		this.bar = add.sprite(303, 281, 'loading-bar');
		this.overlay = add.sprite(298, 276, 'loading-bar-overlay');

		load.onLoadComplete.addOnce(this.onLoadComplete, this);
		load.setPreloadSprite(this.bar);

		//PRELOAD RESOURCES HERE
		Game.preload(load)	
		Player.preload(load)
		ThrownCard.preload(load)
	}

	onLoadComplete() {
		this.game.state.start('game');
	}
}
