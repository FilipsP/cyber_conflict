import Phaser from "phaser";
import TextBox from "../components/textBox.js";

const SUBSCENES = [
    {key:"headquarters",text:"Boring ass shit, just as expected. Do your job ffs..."},
    {key:"face_to_face",text:"Face to face with the strongest and smartest among them. That’s how real men are born."},
    {
        key:"city",
        text:
            "At first some people will die. But then the others will die too. Everything will burn. Unless... You can stop it from happening."
    }
]

export default class ExplanationOfScenario extends Phaser.Scene{
    constructor() {
        super("explanation-of-scenario");
        this.currentSubscene = 0;
    }

    preload() {
        this.load.image("headquarters", "/assets/background/headquarters.png")
        this.load.image("face_to_face", "/assets/background/face_to_face.png")
        this.load.image("city", "/assets/background/city.png")
    }
    create(){
        const screenW = window.innerWidth * window.devicePixelRatio
        const screenH = window.innerHeight * window.devicePixelRatio
        const centerX = screenW/2
        const centerY = screenH/2
        this.background = this.add.image(centerX,centerY,"headquarters")
        this.textBox = new TextBox(this,"Explanation of scenario",SUBSCENES[this.currentSubscene].text)
        this.checkResScale()
        this.input.on("pointerdown",()=>{
            console.log("tap")
            const hadFullText = this.textBox.handleTap();
            if (hadFullText){
                if (this.currentSubscene<SUBSCENES.length-1){
                    this.currentSubscene += 1
                    this.background.destroy();
                    this.background = this.add.image(centerX,centerY,SUBSCENES[this.currentSubscene].key)
                    this.checkResScale()
                    if (this.currentSubscene === 1){
                        this.textBox.setContainerPosition("top")
                    }
                    else {
                        this.textBox.setContainerPosition("bot")
                    }
                    this.background.setDepth(-1)
                    this.textBox.setText(SUBSCENES[this.currentSubscene].text)
                }
                else {
                    this.currentSubscene = 0
                    this.scene.start('actions')
                    this.scene.remove('explanation-of-scenario')
                }
            }

        },this)
    }

    update(time, delta) {
        super.update(time, delta);
    }

    checkResScale(){
        if (window.innerWidth * window.devicePixelRatio > 2560){
            this.background.setScale(2)
        }
        else if (window.innerWidth * window.devicePixelRatio > 1980){
            this.background.setScale(1.3333)
        }
        else if (window.innerWidth * window.devicePixelRatio === 1980){
            this.background.setScale(1)
        }
        else if (window.innerWidth * window.devicePixelRatio <= 1334){
            this.background.setScale(0.69)
            this.textBox.titleStyle.fontSize = 20
            this.textBox.normalTextStyle.fontSize = 14
            this.textBox.standardElDifference = 50
        }
    }



}