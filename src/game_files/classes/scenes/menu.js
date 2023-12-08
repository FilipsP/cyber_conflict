import Phaser from "phaser";

const titleStyle = {
    fontSize: 170,
    fontFamily: 'Share Tech Mono',
    strokeColor: 'white',
    strokeThickness: 5,
    color: '#D9D9D9',
}

const menuBtnStyle = {
    fontSize: 130,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
}

export default class Menu extends Phaser.Scene{
    constructor() {
        super("menu");
    }

    preload(){
        this.load.image("main_menu", "/assets/background/main_menu.png")
    }
    create() {
        if (window.innerHeight>window.innerWidth){
            alert("You probably will not be able to play this as intended because of your screen ratio, sorry <3. Maybe we will create a mobile version for you some day in the future.")
        }
        const bg = this.add.image(0,0,"main_menu").setOrigin(0)
        console.log("Window width: "+window.innerWidth)
        console.log("Window height: "+window.innerHeight)
        const title1 = this.add.text(window.innerWidth*0.1,window.innerHeight*0.05,"Cyber",titleStyle)
        const title2 = this.add.text(window.innerWidth*0.2,+title1.y+window.innerHeight*0.12,"Crisis",titleStyle)
        const playBtn = this.add.text(title1.x,title2.y+window.innerHeight*0.25,"Play",menuBtnStyle)
        const readBtn = this.add.text(title1.x,playBtn.y+window.innerHeight*0.15,"Read",menuBtnStyle)
        const sufferBtn = this.add.text(title1.x,readBtn.y+window.innerHeight*0.15,"Suffer",menuBtnStyle)
        this.btnUnderline = this.add.rectangle(playBtn.x,playBtn.y,250,10,0xEADB74,0.8)
        this.btnUnderline.setAlpha(0)
        this.screenContainer = this.add.container(0,0,[title1,title2,playBtn,readBtn,sufferBtn,this.btnUnderline])
        bg.setScale(window.innerWidth/1920)
        if (window.innerWidth < 1920) {
            if (window.innerWidth > 1500) {
                title1.setScale(0.8)
                title2.setScale(0.8)
                playBtn.setScale(0.8)
                readBtn.setScale(0.8)
                sufferBtn.setScale(0.8)
            } else if (window.innerWidth <= 1500) {
                title1.setScale(0.5)
                title2.setScale(0.5)
                playBtn.setScale(0.5)
                readBtn.setScale(0.5)
                sufferBtn.setScale(0.5)
                this.btnUnderline.setScale(0.5)
            }
        }
        playBtn.setInteractive({ cursor: 'pointer' })
        readBtn.setInteractive({ cursor: 'pointer' })
        sufferBtn.setInteractive({ cursor: 'pointer' })
        playBtn.on('pointerdown',()=> {
            this.scene.start('explanation-of-scenario')
            this.scene.remove('menu')
        })
        readBtn.on('pointerdown',()=>alert("Coming soon!"))
        sufferBtn.on('pointerdown',()=>alert("Coming soon!"))

        this.input.on('gameobjectover', (pointer, gameObject) =>
        {
            gameObject.setTint(0xff0000, 0xff0000, 0xffff00, 0xEADB74);
            this.btnUnderline.y = gameObject.y + (gameObject.height*gameObject.scaleX)
            this.btnUnderline.setOrigin(0,0)
            this.btnUnderline.width = gameObject.width+(gameObject.width/10)
            this.btnUnderline.setAlpha(1)

        });

        this.input.on('gameobjectout', (pointer, gameObject) =>
        {
            gameObject.clearTint();
            this.btnUnderline.setAlpha(0)
        });

        this.tweens.add({
            targets: this.btnUnderline,
            props: {
                scaleX: {value: 0.25, duration: 700},
            },
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
    }
    update(time, delta) {
        super.update(time, delta);
    }
}