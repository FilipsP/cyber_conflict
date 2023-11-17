import Phaser from "phaser";
import TextBox from "../components/textBox.js";
import EconomyData from "../components/economyData.js";
import gameState from "../../gameState.js";
import cardEvents from "../../cardEvents.js";

const STATE = ["TEXT","RESULTS"]

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

let normalCardScale = 0.8;


function getRandomNumber(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min + 1) + min);
}

export default class Actions extends Phaser.Scene{
    constructor() {
        super("actions");
        this.rotatingCard = null;
        this.isRotating = false;
        this.currentState = 0;
    }

    buildContainer(){
        //TODO: create card class and use this as constructor
        const height = window.innerHeight * window.devicePixelRatio
        const card = this.add.rectangle(0,0,580,810,0x21242A)
        const title = this.add.text(0,-card.height*0.45 , "" ,titleStyle).setOrigin(0.5,0)
        const body = this.add.text(0, card.height*0.13,"" ,normalTextStyle).setOrigin(0.5,0)
        const icon = this.add.image(0, card.y-(card.height*0.019), "").setOrigin(0.5,0.75);
        const texture = this.add.image(0, 0, 'back');
        const container = this.add.container(0, height*0.6,[card,texture,title,icon,body])
        //Create a container for title,icon and body
        title.name = "title"
        texture.name = "texture"
        body.name = "body"
        icon.name = "icon"
        container.setAlpha(0)
        container.setScale(0)
        return container
    }

    setShowCardEmitter(cardContainer){
        this.tweens.add({
            targets: cardContainer,
            alpha: 1,
            angle: 0,
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
    setShowEconomyDataEmitter(economyChange,securityChange){
        this.economyData.container.setScale(1)
        this.tweens.add({
            targets: [this.economyData.container,this.textBox.container],
            alpha: 1,
            ease: 'sine.out',
            duration: 500,
            onComplete: () => {
                this.textBox.setTimer()
                this.tweens.add({
                    targets: this.economyData.economyBar,
                    width: this.economyData.economy += (this.economyData.maxEconomy*economyChange),
                    ease: 'linear',
                    duration: 2000,
                    delay:100
                })
                this.tweens.add({
                    targets: this.economyData.securityBar,
                    width: this.economyData.security += (this.economyData.maxSecurity*securityChange),
                    ease: 'linear',
                    duration: 2000,
                    delay:100
                })
            }
        })
    }
    setHideEconomyDataEmitter(){
        this.tweens.add({
            targets: [this.economyData.container],
            duration:500,
            alpha:0,
            scale:30,
            ease: 'expo.in',
        })
        this.tweens.add({
            targets: [this.textBox.container],
            duration:500,
            alpha:0,
            ease: 'expo.out',
        })
    }
    updateStats(economyChange,securityChange){
        this.economyData.security += (this.economyData.maxSecurity*securityChange);
        this.economyData.economy += (this.economyData.maxEconomy*economyChange);
    }

    callStats(cardData) {
        this.events.emit('showStats',cardData.economy,cardData.security);
        setTimeout(()=> {
            //this.updateStats(cardData.economy,cardData.security);
            this.setState(1)
        },2000)
    }

    setState(value){
        if (value > STATE.length){
            value = 0;
        }
        this.currentState = value;
    }

    handleStatsTap(){
        this.events.emit('hideStats')
        this.setState(0)
        this.handleActionSwitch()
    }

    preload(){
        this.load.image('headquarters', 'assets/background/headquarters.png');
        this.load.image('back', 'assets/objects/card/back.png');
        this.load.image('mystery_front', 'assets/objects/card/front_mystery.png');
        this.load.image('front', 'assets/objects/card/front_empty.png');
        this.load.image('coin', 'assets/objects/card/icons/coin_pile.png');
        this.load.image('fire', 'assets/objects/card/icons/fire.png');
        this.load.image('shield', 'assets/objects/card/icons/stat_shield.png');
        for (let j = 0;j<cardEvents.length;j++ ){
            for (let i = 0; i < cardEvents[j].cards.length; i++) {
                this.load.image('icon'+j+i, cardEvents[j].cards[i].icon);
            }
        }
    }
    create(){
        const width = (window.innerWidth)
        const height = (window.innerHeight)
        const centerX = width/2
        const centerY = height/2
        this.background = this.add.image(centerX,centerY,"headquarters")
        this.checkResScale()
        const currentTask = cardEvents[gameState.currentAction].task
        this.textBox = new TextBox(this,currentTask.title,currentTask.body)
        this.leftCardContainer = this.buildContainer()
        this.rightCardContainer = this.buildContainer()
        this.leftCardContainer.name  = "left"
        this.rightCardContainer.name  = "right"
        let pos = [centerX+window.innerWidth*0.15,centerX-window.innerWidth*0.15]
        //pos.splice(getRandomInt(0,pos.length-1), 1)
        this.updateCard(this.leftCardContainer,centerX-window.innerWidth*0.15,0)
        this.updateCard(this.rightCardContainer,centerX+window.innerWidth*0.15,1)
        this.economyData = new EconomyData(this)
        this.economyData.container.setAlpha(0)
        this.events.on('showCardContainer', this.setShowCardEmitter, this);
        this.events.on('showStats', this.setShowEconomyDataEmitter, this);
        this.events.on('hideStats',this.setHideEconomyDataEmitter,this);
        this.events.emit('showCardContainer',this.rightCardContainer);
        this.events.emit('showCardContainer',this.leftCardContainer);
        //TODO: rewrite name usage if more cards are needed!
        //create a list of containers and kill all but selected
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            this.leftCardContainer.getByName('texture').disableInteractive()
            this.rightCardContainer.getByName('texture').disableInteractive()
            const card = gameObject.parentContainer
            const oppositeCard = card.name === "left"?this.rightCardContainer:this.leftCardContainer
            this.tweens.add({
                targets: this.textBox.container,
                alpha: 0,
                ease: 'sine.out',
                duration: 500,
                onComplete: () => {
                    const isLegal = card.cardData.isLegal?"legal":"illegal"
                    this.textBox.setTitle("Feedback on '"+card.cardData.title+"'("+isLegal+")"+":")
                    this.textBox.setText(card.cardData.feedback,false)
                }
            })
            this.tweens.add({
                targets: oppositeCard,
                scale: 0,
                ease: 'sine.inout',
                duration: 500,
                onComplete: () => oppositeCard.setAlpha(0)
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
                            card.setAlpha(0)
                            this.callStats(card.cardData)
                        }
                    })
                }
            })
        })
        this.input.on("pointerdown",()=> {
            switch (STATE[this.currentState]) {
                case STATE[0]:
                    this.textBox.handleTap();
                    break;
                case STATE[1]:
                    const hasFullText = this.textBox.handleTap();
                    if (hasFullText){
                        this.handleStatsTap();
                    }
                    break;
            }
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

    handleActionSwitch(){
        if (gameState.currentAction+1<cardEvents.length){
            gameState.currentAction++
            this.updateCardsContent()
        }
        else{
            alert("End of Demo")
        }
    }

    updateCardsContent(){
        const width = (window.innerWidth * window.devicePixelRatio)
        const centerX = width/2
        const currentAction = cardEvents[gameState.currentAction]
        //TODO: rewrite if more than 2 options are needed, create random order
        this.textBox.setTitle(currentAction.task.title)
        this.textBox.setText(currentAction.task.body)
        //let pos = [centerX+window.innerWidth*0.15,centerX-window.innerWidth*0.15]
        this.updateCard(this.leftCardContainer,centerX+window.innerWidth*0.15,0)
        this.updateCard(this.rightCardContainer,centerX-window.innerWidth*0.15,1)
        this.events.emit('showCardContainer',this.rightCardContainer);
        this.events.emit('showCardContainer',this.leftCardContainer);
        this.tweens.add({
            targets: this.textBox.container,
            alpha: 1,
            ease: 'sine.out',
            duration: 500,
        })
    }

    updateCard(cardContainer,xPos,cardDataIndex){
        const currentAction = cardEvents[gameState.currentAction]
        const cards = currentAction.cards
        const height = window.innerHeight
        const title = cardContainer.getByName('title')
        const body = cardContainer.getByName('body')
        const texture = cardContainer.getByName('texture')
        const icon = cardContainer.getByName('icon')
        title.setText(cards[cardDataIndex].title)
        body.setText(cards[cardDataIndex].body)
        texture.setTexture('back')
        icon.setTexture('icon'+gameState.currentAction+cardDataIndex)
        cardContainer.x  = xPos
        cardContainer.y  = (window.innerHeight*0.6)
        cardContainer.cardData = cards[cardDataIndex]
        icon.setAlpha(0)
        body.setAlpha(0)
        title.setAlpha(0)
    }

    checkResScale(){
        this.background.setScale(window.innerWidth/1920)
        console.log(window.innerWidth/1920)
        if (window.innerWidth/1920<1){
            normalCardScale = (window.innerWidth/1920)-0.2
        }
        if (window.innerWidth * window.devicePixelRatio <= 1500){
            this.background.setScale(0.69)
            titleStyle.fontSize = 25
            normalTextStyle.fontSize = 21
        }
    }

    update(time, delta) {
        super.update(time, delta);
        if (this.isRotating){
            this.rotatingCard.rotation += 0.05
        }
    }
}
