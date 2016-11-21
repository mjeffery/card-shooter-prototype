import 'pixi.js'
import 'p2'
import Phaser from 'phaser'

import Boot from './Boot'
import Preload from './Preload'
import Game from './Game'

let game = new Phaser.Game(1280, 720, Phaser.AUTO, 'app');

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('game', Game);

game.state.start('boot');
