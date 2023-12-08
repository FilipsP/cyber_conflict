import { Assets, Container, Sprite} from "pixi.game_files";

export class Character {
    constructor(who,spawnAt={x:0,y:0}) {
        // Change this to change display name
        this._name = who.charAt(0).toUpperCase() + who.slice(1);
        this._view = new Container();
        this._loadBody(who);
        this.moveTo(spawnAt)

    };
    getCharacterName(){
        return this._name
    }

    moveTo(coords){
        this._view.position.set(coords.x,coords.y)
    }

    async _loadBody(texture){
        let body = new Sprite(await this._loadTexture(texture));
        body.anchor.set(0.5);
        body.scale.set(0.5);
        this._view.addChild(body)
    }

    async _loadTexture(texturePath){
       return await Assets.load(texturePath)
    }
    get view(){
        return this._view;
    }
}