import Phaser from "phaser";
import TextBox from "../components/textBox.js";

const SUBSCENES = [
    {key:"headquarters",text:"Boring ass shit, just as expected. Do your job ffs..."},
    {key:"face_to_face",text:"Face to face with the strongest and smartest among them. That’s how real men are born."},
    {
        key:"city",
        text:
            "At first some people will die. But then the others will die too. Everything will burn. Unless... You can stop it from happening."
    },
    {
        key: "advisor",
        text: "Greetings officer! I will be your advisor on legal matters concerning ongoing hostilities during your mission to conduct cyber operations against Inimicus. Our country, Patria is at war and we need your skills to kick enemy asses!"},

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
        this.load.image("advisor", "/assets/background/cyber_advisor.png")
    }
    create(){
        const screenW = window.innerWidth * window.devicePixelRatio
        const screenH = window.innerHeight * window.devicePixelRatio
        const centerX = screenW/2
        const centerY = screenH/2
        this.background = this.add.image(window.innerWidth/2, window.innerHeight/2,"headquarters")
        this.textBox = new TextBox(this,"Explanation of scenario",SUBSCENES[this.currentSubscene].text)
        this.checkResScale()
        this.input.on("pointerdown",()=>{
            console.log("tap")
            const hadFullText = this.textBox.handleTap();
            if (hadFullText){
                if (this.currentSubscene<SUBSCENES.length-1){
                    this.currentSubscene += 1
                    this.background.destroy();
                    this.background = this.add.image(window.innerWidth/2, window.innerHeight/2,SUBSCENES[this.currentSubscene].key)
                    this.checkResScale()
                    if (this.currentSubscene % 2 !== 0){
                        this.textBox.setContainerPosition("bot")
                    }
                    else {
                        this.textBox.setContainerPosition("top")
                    }
                    if (SUBSCENES[this.currentSubscene].key === "advisor"){
                        this.textBox.setTitle("Advisor:")
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
        if (window.innerWidth >= 2560){
            this.background.setScale(2)
        }
        else if (window.innerWidth >= 1980){
            this.background.setScale(1)
        }
        else if (window.innerWidth <= 1500){
            this.background.setScale(0.8)
        
        }
    }

}