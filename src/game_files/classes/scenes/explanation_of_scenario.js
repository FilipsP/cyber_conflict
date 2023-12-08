import Phaser from "phaser";
import TextBox from "../components/textBox.js";

const SUBSCENES = [
    {
        key:"disclaimer",
        text:"Note, that actions that may be legal under the International Humanitarian Law may not be legal under other Human Rights obligations of the state or its domestic laws."
    },
    {
        key:"headquarters",
        text:"Two countries are in a tense diplomatic situation that escalates into open hostilities. As a cybersecurity officer, you are called into action by the government to lead a team of elite hackers, analysts, and specialists. Your objective is to disrupt Inimicus' military capabilities, cripple their critical infrastructure, and gather intelligence to give Patria the upper hand."
    },
    {
        key:"face_to_face",
        text:"Face to face with the strongest and smartest among them. That’s how real men are born."
    },
    {
        key:"city",
        text: "At first some people will die. But then the others will die too. Everything will burn. Unless... You can stop it from happening."
    },
    {
        key: "advisor",
        text: "Greetings officer! I will be your advisor on legal matters concerning ongoing hostilities during  your mission to conduct cyber operations against Inimicus. Our country, Patria, is at war and we need your skills and judgement to weaken the adversary within the limits of international law."
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
        this.load.image("advisor", "/assets/background/cyber_advisor.png")
        this.load.image("disclaimer", "/assets/background/disclaimer.png")
    }
    create(){
        this.background = this.add.image(window.innerWidth/2, window.innerHeight/2,"disclaimer")
        this.textBox = new TextBox(this,"Disclaimer:",SUBSCENES[this.currentSubscene].text)
        this.textBox.setContainerPosition("mid")
        this.checkResScale()
        this.input.on("pointerdown",()=>{
            const hadFullText = this.textBox.handleTap();
            if (hadFullText){
                if (this.currentSubscene<SUBSCENES.length-1){
                    this.currentSubscene += 1
                    this.background.destroy();
                    this.background = this.add.image(window.innerWidth/2, window.innerHeight/2,SUBSCENES[this.currentSubscene].key)
                    this.checkResScale()
                    if (this.currentSubscene % 2 === 0){
                        this.textBox.setContainerPosition("bot")
                    }
                    else {
                        this.textBox.setContainerPosition("top")
                    }
                    if (SUBSCENES[this.currentSubscene].key === "advisor"){
                        this.textBox.setTitle("Advisor:")
                    }
                    else {
                        this.textBox.setTitle("Explanation of scenario:")
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
        this.background.setScale(window.innerWidth/1920)
    }

}