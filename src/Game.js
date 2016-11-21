import { Tilemap, Physics } from 'phaser'
import Input from './Input'
import Player from './Player'

export default class Game {
	
	constructor() {
		this.showDebug = false;
	}
	
	static preload(load) {
		load.tilemap('flat', 'assets/tilemap/flat.json', null, Tilemap.TILED_JSON)
		load.image('test tiles', 'assets/img/test tiles.png')
	}

	create() {
		const game = this.game,
			  stage = this.stage,
			  add = game.add,
			  physics = game.physics;

		stage.backgroundColor = '#6595ED';

		physics.startSystem(Physics.ARCADE);

		const map = add.tilemap('flat')
		map.addTilesetImage('test tiles')
		//map.enableDebug = true

		const layer = this.layer = map.createLayer('Tile Layer 1')
		//layer.debug = true
		layer.resizeWorld()
		physics.arcade.enable(layer)

		map.setCollision([2, 6])

		const input = new Input(game)
		const player = this.player = new Player(game, 32, 0, input)
		add.existing(player)
		this.game.camera.follow(player)
	}

	update() {
		const physics = this.game.physics.arcade,
			  player = this.player,
			  layer = this.layer;

		physics.collide(player, layer)
		player.think()
	}	

	render() {
		if(this.showDebug) {
			this.game.debug.body(this.player)
		}
	}
}
