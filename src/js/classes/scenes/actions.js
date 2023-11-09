import Phaser from "phaser";
import TextBox from "../components/textBox.js";
import EconomyData from "../components/economyData.js";
import gameState from "../../gameState.js";

//CARD DEMO STRUCT


/*
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
*/

const cardEvents=[
    {
        task:{
            title: "Advisor:",
            body : "Our intelligence suggests that Inimicus is using 2 mobile applications (“Orange” and “Purple”) to influence the outcome of the war."
            },
        cards:
            [{
                title: "Attack “Orange”",
                icon: "assets/objects/card/icons/troy.png",
                body: "“Orange” is used to communicate with resistance forces in Patria, passing coded messages on military plans and targets",
                isLegal: true,
                economy: 0,
                security: 0.1
            },
            {
                title: "Attack “Purple”",
                icon: "assets/objects/card/icons/puppet.png",
                body: "“Purple” is used to spread propaganda among our population. We have the ability to conduct Distributed Denial of Service (DDoS) attacks against one of the applications.",
                isLegal: false,
                economy: -0.1,
                security: 0
            }],
        adversaryAction: {
            economy: 0,
            security: 0,
            isLegal: false,
            body: "We have captured Inimicus’ agent who has infiltrated our facility and installed spyware to collect information from our military networks. The agent has been arrested and the spyware neutralised. The enemy action is within the limits of international law, according to Rule 66 on cyber espionage, which states that information gathering does not violate the laws of armed conflict. According to this rule the captured agent is not considered as a prisoner of war, but as a spy"
        }
    }
]

const titleStyle = {
    fontSize: 35,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
}

const normalTextStyle = {
    fontSize: 25,
    fontFamily: 'Share Tech Mono',
    color: '#D9D9D9',
    wordWrap: { width: 400, useAdvancedWrap: true }
}

let standardElDifference = 400
let normalCardScale = 1;


function getRandomNumber(min, max) {
    return Math.random() * (max - min + 1) + min;
}

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
            scale:normalCardScale*0.8,
            ease: 'quad.out',
            onComplete:()=> {
                let isYoyoTriggered = false
                const cardTexture = cardContainer.getByName("texture")
                this.tweens.add({
                    targets: cardContainer,
                    scaleX:0,
                    scaleY:normalCardScale*0.85,
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
                            scale: normalCardScale*0.9,
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
        const cardData = cardEvents[gameState.currentAction].cards[cardDataIndex]
        const height = window.innerHeight * window.devicePixelRatio
        const card = this.add.rectangle(0,0,580,810,0x21242A)
        const title = this.add.text(0,-card.height*0.45 , cardData.title ,titleStyle).setOrigin(0.5,0)
        const body = this.add.text(0, card.height*0.13, cardData.body ,normalTextStyle).setOrigin(0.5,0)
        const icon = this.add.image(0, card.y-(card.height*0.019), "icon"+cardDataIndex).setOrigin(0.5,0.75);
        const texture = this.add.image(0, 0, 'back');
        const container = this.add.container(xPos, height*0.6,[card,texture,title,icon,body])
        //Create a container for title,icon and body
        container.result = {isLegal:cardData.isLegal, economy:cardData.economy, security:cardData.security}
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

    setEconomyDataEmitter(economyChange,securityChange){
        this.tweens.add({
            targets: this.economyData.container,
            alpha: 1,
            ease: 'sine.out',
            duration: 500,
            onComplete: () => {
                this.tweens.add({
                    targets: this.economyData.economyBar,
                    width: this.economyData.economy += this.economyData.maxEconomy*=economyChange,
                    ease: 'quint.in',
                    duration: 800,
                })
                this.tweens.add({
                    targets: this.economyData.securityBar,
                    width: this.economyData.security += this.economyData.maxSecurity*=securityChange,
                    ease: 'quint.in',
                    duration: 800,
                })
                this.tweens.add({
                    targets: this.economyData.container,
                    delay:2000,
                    duration:500,
                    alpha:0,
                    scale:5,
                    ease: 'expo.in',
                })
            }
        })
    }

    preload(){
        this.load.image('headquarters', 'assets/background/headquarters.png');
        this.load.image('back', 'assets/objects/card/back.png');
        this.load.image('mystery_front', 'assets/objects/card/front_mystery.png');
        this.load.image('front', 'assets/objects/card/front_empty.png');
        this.load.image('coin', 'assets/objects/card/icons/coin_pile.png');
        this.load.image('fire', 'assets/objects/card/icons/fire.png');
        this.load.image('shield', 'assets/objects/card/icons/stat_shield.png');
        for (let i = 0; i < cardEvents[gameState.currentAction].cards.length; i++) {
            this.load.image('icon'+i, cardEvents[[gameState.currentAction]].cards[i].icon);
        }
    }
    create(){
        const width = (window.innerWidth * window.devicePixelRatio)
        const height = (window.innerHeight * window.devicePixelRatio)
        const centerX = width/2
        const centerY = height/2
        this.background = this.add.image(centerX,centerY,"headquarters")
        const leftCardContainer = this.buildContainer(centerX-standardElDifference,0)
        const rightCardContainer = this.buildContainer(centerX+standardElDifference, 1)
        leftCardContainer.name  = "left"
        rightCardContainer.name  = "right"
        const currentTask = cardEvents[gameState.currentAction].task
        this.textBox = new TextBox(this,currentTask.title,currentTask.body)
        this.economyData = new EconomyData(this)
        this.economyData.container.setAlpha(0)
        this.events.on('showStats', this.setEconomyDataEmitter, this);
        this.checkResScale()
        //refactor name usage if more cards are needed!
        //create a list of containers and kill all but selected
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            leftCardContainer.getByName('texture').disableInteractive()
            rightCardContainer.getByName('texture').disableInteractive()
            const card = gameObject.parentContainer
            const oppositeCard = card.name === "left"?rightCardContainer:leftCardContainer
            this.tweens.add({
                targets: this.textBox.container,
                alpha: 0,
                ease: 'sine.out',
                duration: 500,
                onComplete: () => oppositeCard.destroy()
            })
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
                y:centerY,
                scale: normalCardScale,
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
                            this.callStats(card.result)
                        }
                    })
                }
            })
        })
        this.input.on("pointerdown",()=> {
            console.log("tap")
            const hadFullText = this.textBox.handleTap();
        })

        this.input.on('gameobjectover', (pointer, gameObject) =>
        {
            const firstAngle = getRandomNumber(-1.5,1.5)
            const secondAngle = firstAngle*-1
            this.tweens.chain({
                targets: gameObject.parentContainer,
                tweens:[
                    {
                        scale:normalCardScale*0.9,
                        angle: 0,
                        ease: 'quad.out',
                        duration:0,
                    },
                    {
                        props:{
                            scale:{value: normalCardScale*0.95},
                            angle: {value:firstAngle,yoyo:true},
                        },
                        ease: 'sine.in',
                        duration:100,
                    },
                    {
                        angle:secondAngle,
                        yoyo:true,
                        ease: 'sine.out',
                        duration:100,
                    },
                ]
            })
        });

        this.input.on('gameobjectout', (pointer, gameObject) =>
        {
            this.tweens.add({
                targets: gameObject.parentContainer,
                scale: normalCardScale*0.9,
                angle: 0,
                ease: 'expo.out',
                duration:200
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

    callStats(result) {
        this.events.emit('showStats',result.economy,result.security);
    }

    update(time, delta) {
        super.update(time, delta);
        if (this.isRotating){
            this.rotatingCard.rotation += 0.05
        }
    }
}