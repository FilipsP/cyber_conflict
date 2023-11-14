import gameState from "../../gameState.js";

export default class EconomyData {
    constructor(parent) {
        this.economy = 300 * gameState.playerData.economy
        this.security = 60 * gameState.playerData.security
        this.maxEconomy = 300
        this.maxSecurity = 300

        this.parent = parent
        this._buildEconomyData(parent)
    }
    _buildEconomyData(parent){
        const screenW = window.innerWidth * window.devicePixelRatio
        const screenH = window.innerHeight * window.devicePixelRatio
        const centerX = screenW/2
        const centerY = screenH/2
        this.background = parent.add.rectangle(0,0,600,350,0x21242A)
        this.background.setStrokeStyle(3, 0x6BB9B6)
        this.coin = parent.add.image(-this.background.width*0.30,-80,"coin")
        this.shield = parent.add.image(-this.background.width*0.30,80,"shield")
        this.economyBar = parent.add.rectangle(-60,-80,this.maxEconomy,100,0xFFD102).setOrigin(0,0.5)
        this.economyBar.setStrokeStyle(3, 0xF2A203)
        this.securityBar = parent.add.rectangle(-60,80,this.maxSecurity,100,0xA7ADBA).setOrigin(0,0.5)
        this.securityBar.setStrokeStyle(3, 0x2F363D)
        this.securityBar.width = this.security
        this.container = parent.add.container(centerX, centerY, [this.background,this.coin,this.shield,this.economyBar,this.securityBar]);
    }
}