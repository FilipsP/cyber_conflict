import cardEvents from "../../cardEvents.js";
import gameState from "../../gameState.js";

const titleStyle = {
    fontSize: 40,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
}
export default class FinalStats {
    constructor(parent) {
        const cellPosition = []
        let position = {
            x:-1400,
            y:100
        }
        const answersLength = gameState.playerData.answers.length
        console.log(answersLength)
        for (let i = 0;i<answersLength;i++){
            position.x += 350
            const element = parent.add.rectangle(position.x,position.y,200,200,0x21242A)
            element.setStrokeStyle(5, 0x0C0A00)
            const titleText = gameState.playerData.answers[i]?"Legal":"Illegal"
            const title = parent.add.text(element.x,element.y,titleText,titleStyle).setOrigin(0.5)
            if (i<answersLength-2){
                const progress = parent.add.image(element.x+190,element.y,"progress")
                cellPosition.push(progress)
            }
            cellPosition.push(element,title)
        }
        this.container = parent.add.container(window.innerWidth/2,window.innerHeight/2, cellPosition);
        console.log(window.innerWidth)
        this.container.setScale(window.innerWidth/2560)
    }
}