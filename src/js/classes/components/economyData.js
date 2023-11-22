import gameState from "../../gameState.js";

export default class EconomyData {
    constructor(parent,who = "player") {
        this.titleStyle = {
            fontSize: 40,
            fontFamily: 'Share Tech Mono',
            color: '#D9D9D9',
        }
        this.maxEconomy = 300
        this.maxSecurity = 300
        this.economy = this.maxEconomy * gameState.playerData.economy
        this.security = this.maxSecurity * gameState.playerData.security
        this.scaleFactor = 1
        this._setScaleFactor()
        this.parent = parent
        this._buildEconomyData(parent,who)
    }
    _setScaleFactor(){
        const scale = window.innerHeight/1320
        if (scale<1){
            this.scaleFactor = scale
        }
        if (this.scaleFactor<0.5){
            this.scaleFactor = 0.5
        }
    }
    _buildEconomyData(parent,who){
        this.background = parent.add.rectangle(0,0,600,350,0x21242A)
        this.titleBackground = parent.add.rectangle(0,-220,270,80,0x21242A)
        this.titleBackground.setStrokeStyle(5, 0x0C0A00)
        if (who === "player"){
            this.title = parent.add.text(this.titleBackground.x,this.titleBackground.y,"Your stats",this.titleStyle).setOrigin(0.5)
            this.coin = parent.add.image(-this.background.width*0.30,-80,"coin")
            this.shield = parent.add.image(-this.background.width*0.30,80,"shield")
            this.background.setStrokeStyle(3, 0x6BB9B6)
            this.economyBar = parent.add.rectangle(-60,-80,this.maxEconomy,100,0xFFD102).setOrigin(0,0.5)
            this.economyBar.setStrokeStyle(3, 0xF2A203)
            this.securityBar = parent.add.rectangle(-60,80,this.maxSecurity,100,0xA7ADBA).setOrigin(0,0.5)
            this.securityBar.setStrokeStyle(3, 0x2F363D)
        }
        //TODO: elseif/switch or subclasses in case there can be more than two sides/types
        else{
            this.title = parent.add.text(this.titleBackground.x,this.titleBackground.y,"Enemy stats",this.titleStyle).setOrigin(0.5)
            this.coin = parent.add.image(-this.background.width*0.30,-80,"blood_coin")
            this.shield = parent.add.image(-this.background.width*0.30,80,"fire")
            this.background.setStrokeStyle(3, 0xC10001)
            this.economyBar = parent.add.rectangle(-60,-80,this.maxEconomy,100,0xFFD102).setOrigin(0,0.5)
            this.economyBar.setStrokeStyle(3,0x400303)
            this.securityBar = parent.add.rectangle(-60,80,this.maxSecurity,100,0xDA5E21).setOrigin(0,0.5)
            this.securityBar.setStrokeStyle(3, 0xFE7F36)
        }
        this.securityBar.width = this.security
        this.economyBar.width = this.economy
        this.container = parent.add.container(window.innerWidth/2, (window.innerHeight*0.6), [this.background,this.titleBackground,this.title,this.coin,this.shield,this.economyBar,this.securityBar]);
        this.container.setScale(0)
    }

    reset(){
        this.container.setScale(this.scaleFactor)
    }
}