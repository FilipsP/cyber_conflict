import Phaser from "phaser";

const SUBSCENES = [
    {key:"headquarters",text:"Boring ass shit, just as expected. Do your job ffs..."},
    {key:"face_to_face",text:"Face to face with the strongest and smartest among them. That’s how real men are born."},
    {
        key:"city",
        text:
            "At first some people will die. But then the others will die too. Everything will burn. Unless... You can stop it from happening."
    }
]


const titleStyle = {
    fontSize: 60,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
}

const normalTextStyle = {
    fontSize: 25,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
    wordWrap: { width:  (window.innerWidth * window.devicePixelRatio-200), useAdvancedWrap: true }
}

let standardElDifference = 100

export default class ExplanationOfScenario extends Phaser.Scene{
    constructor() {
        super("explanation-of-scenario");
        this.chars = 0;
        this.currentSubscene = 0;
        this.displayedText = "";
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
        this.checkResScale()
        this.textBox = this.add.rectangle(0,0,screenW-130,230,0x21242A)
        const title = this.add.text(-this.textBox.width*0.4,-80, "Explanation of the scenario",titleStyle)
        this.displayedText = this.add.text(title.x, title.y+standardElDifference, "",normalTextStyle)
        this.textContainer = this.add.container(centerX, 150,[this.textBox,title,this.displayedText]);
        this.setTimer();
        this.input.on("pointerdown",()=>{
            console.log("tap")
            if (this.chars < SUBSCENES[this.currentSubscene].text.length)
            {
                this.chars = SUBSCENES[this.currentSubscene].text.length
                this.displayedText.setText(SUBSCENES[this.currentSubscene].text.substring(0,this.chars))
            }
            else
            {
                if (this.currentSubscene<SUBSCENES.length-1){
                    this.currentSubscene += 1
                }
                else {
                    this.currentSubscene = 0
                    this.scene.start('actions')
                }
                this.background.destroy();
                this.background = this.add.image(centerX,centerY,SUBSCENES[this.currentSubscene].key)
                this.checkResScale()
                if (this.currentSubscene === 1){
                    this.textContainer.y = (window.innerHeight * window.devicePixelRatio) - 150
                }
                else {
                    this.textContainer.y = 150
                }
                this.background.setDepth(-1)
                this.chars = 0
                this.setTimer()
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
            titleStyle.fontSize = 20
            normalTextStyle.fontSize = 14
            standardElDifference = 50
        }
    }

    setTimer(){
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
            this.displayedText.setText(SUBSCENES[this.currentSubscene].text.substring(0,this.chars))
            if (this.chars<SUBSCENES[this.currentSubscene].text.length){
                this.chars++
            }
            else{
                return clearInterval(this.timer)
            }
        },30)
    }

}