import Phaser from "phaser";
import getEnding from "../../endings.js";
import TextBox from "../components/textBox.js";
import FinalStats from "../components/finalStats.js";


export default class Ending extends Phaser.Scene{
    constructor() {
        super("ending");
    }

    preload(){
        this.load.image("clear_win", "/assets/background/endings/clear_win.png")
        this.load.image("lose", "/assets/background/endings/lose.png")
        this.load.image("neutral", "/assets/background/endings/neutral.png")
        this.load.image("secret", "/assets/background/endings/secret.png")
        this.load.image("weak_win", "/assets/background/endings/weak_win.png")
        this.load.image("progress", "/assets/objects/bars/progress.png")
    }
    create() {
        const endingData = getEnding()
        const width = (window.innerWidth)
        const height = (window.innerHeight)
        const centerX = width/2
        const centerY = height/2
        this.background = this.add.image(centerX,centerY,endingData.bg)
        this.background.setScale(window.innerWidth/1920)
        this.textBox = new TextBox(this,endingData.title,"")
        this.textBox.setText(endingData.body)
        this.input.on("pointerdown",()=> {
            let isEnd = this.textBox.handleTap();
            if (isEnd){
                alert("End of the demo!\nThanks for playing!")
            }
        })
        this.finalStats = new FinalStats(this)
    }
    update(time, delta) {
        super.update(time, delta);
    }
}