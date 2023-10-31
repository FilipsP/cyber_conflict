import Phaser from 'phaser'
import ExplanationOfScenario from "./classes/scenes/explanation_of_scenario.js";
import Actions from "./classes/scenes/actions.js";
import Menu from "./classes/scenes/menu.js";

const game = new Phaser.Game({
    type: Phaser.WEBGL,
    parent: 'cyber-crisis-container',
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth * window.devicePixelRatio,
        height: (window.innerHeight * window.devicePixelRatio)-100,
        autoCenter: Phaser.Scale.CENTER_BOTH,},
    pixelArt:true,
    backgroundColor: 0x485058,
    scene:[Menu,ExplanationOfScenario,Actions],
    //scene:[Actions]
});

globalThis.__PHASER_GAME__ = game;

