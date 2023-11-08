export default class TextBox {
    constructor(parentScene,title,initialText) {
        this.titleStyle = {
            fontSize: 60,
            fontFamily: 'Share Tech Mono',
            color: '#D9D9D9',
        }

        this.normalTextStyle = {
            fontSize: 25,
            fontFamily: 'Share Tech Mono',
            color: '#D9D9D9',
            wordWrap: { width:  ((window.innerWidth * window.devicePixelRatio)-200), useAdvancedWrap: true }
        }
        this.standardElDifference = 100
        this.fullText = initialText
        this.chars = 0;
        this.parent = parentScene
        this._buildBox(parentScene,title)
        this.setTimer()
    }

    _buildBox(parentScene,title){
        const screenW = window.innerWidth * window.devicePixelRatio
        //const screenH = window.innerHeight * window.devicePixelRatio
        const centerX = screenW/2
        //const centerY = screenH/2
        this.background = parentScene.add.rectangle(0,0,screenW-130,230,0x21242A)
        this.normalTextStyle.wordWrap.width = this.background.width - (this.background.width*0.2)
        this.title = parentScene.add.text(-this.background.width*0.4,-80, title,this.titleStyle)
        this.textToDisplay = parentScene.add.text(this.title.x, this.title.y+this.standardElDifference,"",this.normalTextStyle)
        this.container = parentScene.add.container(centerX, 150,[this.background,this.title,this.textToDisplay]);
    }

    handleTap(){
        if (this.chars < this.fullText.length)
        {
            this.chars = this.fullText.length
            this.textToDisplay.setText(this.fullText.substring(0,this.chars))
            return false;
        }
        return true;
    }

    setBGHeight(){
        // should alter bg based on text size
    }

    setTitle(title){
        this.title.setText(title)
    }

    setText(text){
        this.fullText = text
        this.chars = 0
        this.setTimer()
    }

    setContainerPosition(position){
        switch (position) {
            case "top":
                this.container.y = (window.innerHeight * window.devicePixelRatio) - 150
                break
            case "bot":
                this.container.y = 150
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