import * as PIXI from "pixi.js"
import {Character} from "./classes/characters/character.js";
import manifest from "../texture-manifest.json";
import {Assets, Container, Sprite} from "pixi.js";

const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0xedf2f4,
})

document.body.appendChild(app.view)

function makeClickable(elements) {
    for (const element of elements) {
        element.view.eventMode = 'static';
        element.view.cursor = 'pointer';

        element.view.on('pointertap', async () =>
        {
            console.log("clicked on "+ element.getCharacterName())
            alert("This is the "+element.getCharacterName())

        });
    }
}
async function loadBundle(bundleName){
    await Assets.loadBundle(bundleName);
}

async function init(){
    await PIXI.Assets.init({manifest: manifest});
    await loadBundle("characters")
    await loadBundle("backgrounds")
    let bg = new Container()
    Assets.load("world map").then(
        texture=>{
            const sprite = new Sprite(texture)
            sprite.anchor.set(0.5)
            sprite.scale.set(1.3)
            bg.addChild(sprite)
        }
    )
    bg.position.set(app.screen.width / 2,app.screen.height / 2)
    app.stage.addChild(bg)

    let coords = {x:app.screen.width / 2,y:app.screen.height / 2}
    // Add chars to the stage
    const protagonist = new Character("protagonist",{x:coords.x-500,y:coords.y});
    const advisor = new Character("advisor",coords);
    const antagonist = new Character("antagonist",{x:coords.x+500,y:coords.y});

    app.stage.addChild(protagonist.view);
    app.stage.addChild(advisor.view);
    app.stage.addChild(antagonist.view);
    makeClickable([protagonist,advisor,antagonist])
}

// Create a display object

init().then(()=>{
  console.log("app initialized")
}
).catch(
    error=> {
      console.error("app init failed")
      console.error(error)
    }
);



