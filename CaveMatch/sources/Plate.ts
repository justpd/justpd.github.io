import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { Game } from "./Game";


export class Plate extends Container {

    private _background: Sprite;
    private fieldTextures: Texture[] = [
        Game.RES._bg_0.texture,
        Game.RES._bg_1.texture,
        Game.RES._bg_2.texture,
        Game.RES._bg_3.texture,
    ];
    
    constructor() {
        super();

        this._background = new Sprite(this.fieldTextures[Math.floor(Math.random() * 4)]);
        this.addChild(this._background);
    }
}