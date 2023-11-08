import Phaser from "phaser";

const titleStyle = {
    fontSize: 120,
    fontFamily: 'Share Tech Mono',
    strokeColor: 'white',
    strokeThickness: 5,
    color: '#D9D9D9',
}

const menuBtnStyle = {
    fontSize: 90,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
}

let standardElDifference = 200

export default class Menu extends Phaser.Scene{
    constructor() {
        super("menu");
    }

    preload(){
        this.load.image("main_menu", "/assets/background/main_menu.png")
    }
    create() {
        const centerX = (window.innerWidth * window.devicePixelRatio)/2
        const centerY = (window.innerHeight * window.devicePixelRatio)/2
        const bg = this.add.image(0,0,"main_menu").setOrigin(0)
        if (window.innerWidth * window.devicePixelRatio > 2560){
            bg.setScale(2)
        }
        else if (window.innerWidth * window.devicePixelRatio > 1980){
            bg.setScale(1.3333)
        }
        else if (window.innerWidth * window.devicePixelRatio <= 1334){
            bg.setScale(0.69)
            titleStyle.fontSize = 80
            menuBtnStyle.fontSize = 50
            standardElDifference = 80
        }
        const title1 = this.add.text(-centerX/1.2,-centerY/1.1,"Cyber",titleStyle)
        const title2 = this.add.text(-centerX/1.5,title1.y+standardElDifference,"Crisis",titleStyle)
        const playBtn = this.add.text(-centerX/1.2,-centerY/4,"Play",menuBtnStyle)
        const readBtn = this.add.text(-centerX/1.2,playBtn.y+standardElDifference,"Read",menuBtnStyle)
        const sufferBtn = this.add.text(-centerX/1.2,readBtn.y+standardElDifference,"Suffer",menuBtnStyle)
        this.btnUnderline = this.add.rectangle(-centerX/1.2,playBtn.y,250,10,0xEADB74,0.8)
        this.btnUnderline.setAlpha(0)
        this.screenContainer = this.add.container(centerX, centerY,[title1,title2,playBtn,readBtn,sufferBtn,this.btnUnderline])
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
            this.btnUnderline.y = gameObject.y + gameObject.height+10
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