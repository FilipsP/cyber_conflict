import cardEvents from "../../cardEvents.js";
import gameState from "../../gameState.js";

const titleStyle = {
    fontSize: 40,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
}
export default class FinalStats {
    constructor(parent) {
        this.cellPosition = []
        this.parent = parent
        let position = {
            x:-1050,
            y:100
        }
        const answersLength = gameState.playerData.answers.length
        console.log("Answers:",gameState.playerData.answers)
        let row = 0;
        for (let i = 0;i<answersLength;i++){
            const element = this.parent.add.rectangle(position.x,position.y,200,200,0x21242A)
            element.setStrokeStyle(5, 0x0C0A00)
            const titleText = gameState.playerData.answers[i]?"Legal":"Illegal"
            const title = this.parent.add.text(element.x,element.y,titleText,titleStyle).setOrigin(0.5)
            if ((i+1)%7===0){
                position.y += 350
                this.setProgressVerticalBar(element)
                row++
            }
            else{
                const deviation = row%2 === 0?350:-350
                position.x += deviation
                if (i<answersLength-1) {
                    this.setProgressHorizontalBar(element,row)
                }
            }
            this.cellPosition.push(element,title)
        }
        this.container = parent.add.container(window.innerWidth/2,window.innerHeight/2, this.cellPosition);
        this.container.setScale(window.innerWidth/2560)
    }
    setProgressVerticalBar(element){
        console.log("bar")
        const progress = this.parent.add.image(element.x,element.y+190,"progress")
        progress.setAngle(90)
        this.cellPosition.push(progress)
    }
    setProgressHorizontalBar(element,row){
        console.log("bar")
        const deviation = row%2 === 0?190:-190
        const progress = this.parent.add.image(element.x+deviation,element.y,"progress")
        this.cellPosition.push(progress)
    }
}