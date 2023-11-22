export default class TextBox {
    constructor(parentScene,title,initialText) {
        this.fullText = initialText
        this.chars = 0;
        this.parent = parentScene
        this.scaleFactor = 0.7
        this.getScaleFactor()
        this.titleStyle = {
            fontSize: 170,
            fontFamily: 'Share Tech Mono',
            color: '#D9D9D9',
        }

        this.normalTextStyle = {
            fontSize: 100,
            fontFamily: 'Share Tech Mono',
            color: '#D9D9D9',
            wordWrap: { width: window.innerWidth, useAdvancedWrap: true }
        }
        this._buildBox(parentScene,title)
        this.setContainerPosition()
        this.setTimer()
    }

    _buildBox(parentScene,title){
        const screenW = window.innerWidth
        const centerX = screenW/2
        //const centerY = screenH/2
        this.background = parentScene.add.rectangle(0,0,window.innerWidth*0.9,window.innerHeight*0.22,0x21242A)
        this.normalTextStyle.wordWrap.width = (this.background.width*0.9)  / this.scaleFactor
        this.title = parentScene.add.text(-this.background.width*0.45,-this.background.height*0.43,title,this.titleStyle)
        this.textToDisplay = parentScene.add.text(-this.background.width*0.45,this.title.y+((this.title.height*1.35)*this.scaleFactor),"",this.normalTextStyle)
        //this.textToDisplay = parentScene.add.text(0,0,"",this.normalTextStyle).setOrigin(0.5)
        this.container = parentScene.add.container(centerX, window.innerHeight*0.7,[this.background,this.title,this.textToDisplay]);
        this.title.setScale(this.scaleFactor)
        this.textToDisplay.setScale(this.scaleFactor)
    }

    getScaleFactor(){
        this.scaleFactor = window.innerHeight / 4096
    }

    handleTap(){
        if (this.chars < this.fullText.length)
        {
            this.chars = this.fullText.length
            this.textToDisplay.setText(this.fullText.substring(0,this.chars))
            return false;
        }
        clearInterval(this.timer)
        return true;
    }

    setTitle(title){
        this.title.setText(title)
    }

    setText(text,startTimer= true){
        clearInterval(this.timer)
        this.chars = 0
        this.textToDisplay.setText("")
        this.fullText = text
        this.background.setScale(this.background.scaleX,1+(this.fullText.length/2000))
        if (startTimer){
            this.setTimer()
        }
    }

    setContainerPosition(position){
        const H = window.innerHeight
        switch (position) {
            case "top":
                this.container.y = H*0.2
                break
            case "bot":
                this.container.y = H*0.8
                break
            case "mid":
                this.container.y = H*0.7
                break
            default:
                this.container.y = H*0.2
                break
        }
    }

    setTimer(){
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
            this.textToDisplay.setText(this.fullText.substring(0,this.chars))
            if (this.chars<this.fullText.length){
                this.chars++
            }
            else{
                return clearInterval(this.timer)
            }
        },30)
    }
}