export default class TextBox {
    constructor(parentScene,title,initialText) {
        this.titleStyle = {
            fontSize: 50,
            fontFamily: 'Share Tech Mono',
            color: '#D9D9D9',
        }

        this.normalTextStyle = {
            fontSize: 30,
            fontFamily: 'Share Tech Mono',
            color: '#D9D9D9',
            wordWrap: { width:  ((window.innerWidth * window.devicePixelRatio)-200), useAdvancedWrap: true }
        }
        this.fullText = initialText
        this.chars = 0;
        this.parent = parentScene
        this._buildBox(parentScene,title)
        this.setTimer()
    }

    _buildBox(parentScene,title){
        const screenW = window.innerWidth * window.devicePixelRatio
        const screenH = window.innerHeight * window.devicePixelRatio
        const centerX = screenW/2
        //const centerY = screenH/2
        this.background = parentScene.add.rectangle(0,0,screenW-130,screenH*0.22,0x21242A)
        this.normalTextStyle.wordWrap.width = this.background.width - (this.background.width*0.2)
        this.title = parentScene.add.text(-this.background.width*0.45,-80, title,this.titleStyle)
        this.textToDisplay = parentScene.add.text(-this.background.width*0.45,-this.background.height*0.05,"",this.normalTextStyle)
        this.container = parentScene.add.container(centerX, 150,[this.background,this.title,this.textToDisplay]);
        this.setContainerPosition("top");
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

    setBGHeight(){
        // should alter bg based on text size
    }

    setTitle(title){
        this.title.setText(title)
    }

    setText(text,startTimer= true){
        clearInterval(this.timer)
        this.chars = 0
        this.textToDisplay.setText("")
        this.fullText = text
        const screenH = window.innerHeight
        this.background.height = (screenH*0.22) + (text.length*0.05)
        if (startTimer){
            this.setTimer()
        }
    }

    setContainerPosition(position){
        const H = window.innerHeight * window.devicePixelRatio
        switch (position) {
            case "top":
                this.container.y = H*0.15
                break
            case "bot":
                this.container.y = H*0.85
                break
            case "mid":
                this.container.y = H*0.7
                break
            default:
                this.container.y = 150
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