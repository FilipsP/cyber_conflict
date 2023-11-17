import gameState from "../../gameState.js";

export default class EconomyData {
    constructor(parent) {
        this.maxEconomy = 300
        this.maxSecurity = 300
        this.economy = this.maxEconomy * gameState.playerData.economy
        this.security = this.maxSecurity * gameState.playerData.security
        this.scaleFactor = 1
        this._setScaleFactor()
        this.parent = parent
        this._buildEconomyData(parent)
    }
    _setScaleFactor(){
        const scale = window.innerHeight/2160
        console.log(scale)
        if (scale<1){
            this.scaleFactor = scale
        }
    }
    _buildEconomyData(parent){
        this.background = parent.add.rectangle(0,0,600,350,0x21242A)
        this.background.setStrokeStyle(3, 0x6BB9B6)
        this.coin = parent.add.image(-this.background.width*0.30,-80,"coin")
        this.shield = parent.add.image(-this.background.width*0.30,80,"shield")
        this.economyBar = parent.add.rectangle(-60,-80,this.maxEconomy,100,0xFFD102).setOrigin(0,0.5)
        this.economyBar.setStrokeStyle(3, 0xF2A203)
        this.securityBar = parent.add.rectangle(-60,80,this.maxSecurity,100,0xA7ADBA).setOrigin(0,0.5)
        this.securityBar.setStrokeStyle(3, 0x2F363D)
        this.securityBar.width = this.security
        this.container = parent.add.container(window.innerWidth/2, (window.innerHeight*0.6), [this.background,this.coin,this.shield,this.economyBar,this.securityBar]);
    }
}