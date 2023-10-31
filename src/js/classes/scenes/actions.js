import Phaser from "phaser";

//CARD DEMO STRUCT
const cards=
    [
        {
            title:"Brute-force",
            icon:"assets/objects/card/icons/bruteforce.png",
            body:"Deploy your digital brute-force prowess to breach enemy defenses. This card allows you to target a single opponent's security system, attempting to overpower their defenses through sheer computational strength. Success could provide you with valuable intelligence or disrupt their operations"

        },
        {
            title:"Mass Disruption",
            icon:"assets/objects/card/icons/puppet.png",
            body:" Unleash chaos across the digital battlefield with the \"Mass Disruption\" card. When played, this card can disrupt multiple enemy systems simultaneously, causing temporary chaos and confusion among your rivals. Use it strategically to gain the upper hand or disrupt your opponents' well-laid plans"
        }
    ]

const titleStyle = {
    fontSize: 40,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
}

const normalTextStyle = {
    fontSize: 20,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
    wordWrap: { width: 400, useAdvancedWrap: true }
}

let standardElDifference = 400

export default class Actions extends Phaser.Scene{
    constructor() {
        super("actions");
        this.rotatingCard = null;
        this.isRotating = false;
    }

    setCardAnimation(cardContainer){
        this.tweens.add({
            targets: cardContainer,
            alpha: 1,
            scale:0.9,
            ease: 'quad.out',
            onComplete:()=> {
                let isYoyoTriggered = false
                const cardTexture = cardContainer.getByName("texture")
                this.tweens.add({
                    targets: cardContainer,
                    scaleX:0,
                    scaleY:0.85,
                    duration: 300,
                    delay: 700,
                    yoyo:true,
                    ease: 'sine.inout',
                    onYoyo:()=>{
                        if (isYoyoTriggered){
                            isYoyoTriggered = false
                        }
                        else{
                            if (cardTexture.texture.key === 'mystery_front'){
                                cardTexture.setTexture('back')
                            }
                            else{
                                cardTexture.setTexture('mystery_front')
                            }
                            isYoyoTriggered = true
                        }
                    },
                    onComplete:()=>{
                        this.tweens.add({
                            targets: cardContainer,
                            scale: 1,
                            ease: 'sine.in',
                            delay: 300
                        })
                        this.tweens.add({
                            targets: cardTexture,
                            alpha: 0.5,
                            yoyo:true,
                            ease: 'sine.in',
                            onYoyo:()=> {
                                cardTexture.setTexture('front')
                                this.tweens.add({
                                    targets: [cardContainer.getByName("title"),cardContainer.getByName("icon"),cardContainer.getByName("body")],
                                    alpha: 1,
                                    ease: 'sine.in',
                                    onComplete:()=>cardTexture.setInteractive({ cursor: 'pointer' })
                                })
                            }
                        })
                    }
                });
            }
        });
    }
    buildContainer(xPos,cardDataIndex){
        const centerY = (window.innerHeight * window.devicePixelRatio)/2
        const card = this.add.rectangle(0,0,580,810,0x21242A)
        const title = this.add.text(card.x,card.y-(card.height*0.45) , cards[cardDataIndex].title ,titleStyle).setOrigin(0.5,0)
        const body = this.add.text(card.x, card.y+(centerY*0.2), cards[cardDataIndex].body ,normalTextStyle).setOrigin(0.5,0)
        const icon = this.add.image(card.x, card.y, "icon"+cardDataIndex).setOrigin(0.5,0.75);
        const texture = this.add.image(card.x, card.y, 'back');
        const container = this.add.container(xPos, centerY,[card,texture,title,icon,body])
        //Create a container for title,icon and body
        title.name = "title"
        texture.name = "texture"
        body.name = "body"
        icon.name = "icon"
        console.log(icon.name)
        icon.setAlpha(0)
        body.setAlpha(0)
        title.setAlpha(0)
        container.setAlpha(0)
        container.setScale(0)
        this.setCardAnimation(container)
        return container
    }

    preload(){
        this.load.image('headquarters', 'assets/background/headquarters.png');
        this.load.image('back', 'assets/objects/card/back.png');
        this.load.image('mystery_front', 'assets/objects/card/front_mystery.png');
        this.load.image('front', 'assets/objects/card/front_empty.png');
        for (let i = 0; i < cards.length; i++) {
            this.load.image('icon'+i, cards[i].icon);
        }
    }
    create(){
        const centerX = (window.innerWidth * window.devicePixelRatio)/2
        const centerY = (window.innerHeight * window.devicePixelRatio)/2
        this.background = this.add.image(centerX,centerY,"headquarters")
        const leftCardContainer = this.buildContainer(centerX-standardElDifference,0)
        const rightCardContainer = this.buildContainer(centerX+standardElDifference, 1)
        leftCardContainer.name  = "left"
        rightCardContainer.name  = "right"
        this.checkResScale()
        //refactor name usage if more cards are needed!
        //create a list of containers and kill all but selected
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            leftCardContainer.getByName('texture').disableInteractive()
            rightCardContainer.getByName('texture').disableInteractive()
            const card = gameObject.parentContainer
            const oppositeCard = card.name === "left"?rightCardContainer:leftCardContainer
            this.tweens.add({
                targets: oppositeCard,
                scale: 0,
                ease: 'sine.inout',
                duration: 500,
                onComplete: () => oppositeCard.destroy()
            })
            this.tweens.add({
                targets: card,
                x: centerX,
                y: centerY,
                scale: 1,
                ease: 'sine.inout',
                onComplete: () => {
                    this.tweens.add({
                        targets: card,
                        scale: 0,
                        duration: 500,
                        delay: 2000,
                        ease: 'sine.inout',
                        onStart: () => {
                            this.rotatingCard = card
                            this.isRotating = true
                        },
                        onComplete: () => {
                            this.isRotating = false
                            this.rotatingCard = null
                            card.destroy()
                            //switchToNextScene()
                        }
                    })
                }
            })
        })
        this.input.on('gameobjectover', (pointer, gameObject) =>
        {
            this.tweens.chain({
                targets: gameObject.parentContainer,
                tweens:[
                    {
                        props:{
                            scale:{value: 1.1},
                            angle: {value:1,yoyo:true},
                        },
                        ease: 'sine.in',
                        duration:100,
                    },
                    {
                        angle:-1,
                        yoyo:true,
                        ease: 'sine.out',
                        duration:100,
                        onComplete:()=>{
                            {
                                this.currentSelectionTween =  this.tweens.add({
                                    targets: gameObject.parentContainer,
                                    scale: 1.12,
                                    yoyo:true,
                                    duration:1000,
                                    repeat:-1,
                                    ease: 'circ.inout',
                                })
                            }
                        }
                    },
                ]
            })
        });

        this.input.on('gameobjectout', (pointer, gameObject) =>
        {
            this.currentSelectionTween.remove();
            this.tweens.add({
                targets: gameObject.parentContainer,
                scale: 1,
                ease: 'sine.in',
                duration:100
            })
        });
    }

    checkResScale(){
        if (window.innerWidth * window.devicePixelRatio > 2560){
            this.background.setScale(2)
        }
        else if (window.innerWidth * window.devicePixelRatio > 1980){
            this.background.setScale(1.3333)
        }
        else if (window.innerWidth * window.devicePixelRatio === 1980){
            this.background.setScale(1)
        }
        else if (window.innerWidth * window.devicePixelRatio <= 1334){
            this.background.setScale(0.69)
            titleStyle.fontSize = 15
            normalTextStyle.fontSize = 10
            standardElDifference = 50
        }
    }

    update(time, delta) {
        super.update(time, delta);
        if (this.isRotating){
            this.rotatingCard.rotation += 0.05
        }
    }
}