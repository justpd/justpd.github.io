import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Game} from "./Game";
import Texture = PIXI.Texture;

export class Rocket extends Container
{
    // Params >>------------------------------------------------------------<<<<
    private _image: Sprite;
    public speed: number = 4;
    public velocity: number = 0;
    public posX: number = Game.WIDTH/2 - 48;
    public posY: number = Game.HEIGHT - 32;
    private _longRocket: Texture;
    private _normalRocket: Texture;
    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor()
    {
        super();
        this.configurate();
    }

    protected configurate():void
    {
        this._normalRocket = Texture.fromImage('assets/rocket.png');
        this._longRocket = Texture.fromImage('assets/long_rocket.png');
        this._image = new Sprite(this._normalRocket);
        this._image.position.set(this.posX, this.posY);
        this.addChild(this._image);
    }

    public reset():void
    {
        this.posX = Game.WIDTH/2 - 48;
        this._image.position.set(this.posX, this.posY);
    }

    public move():void
    {
        this.posX += this.velocity * this.speed;

        if (this.posX <= 32){
            this.posX = 32;
        }
        if (this.posX >= Game.WIDTH - this.width - 32){
            this.posX = Game.WIDTH - this.width - 32;
        }
        this._image.position.set(this.posX, this.posY);
    }

    public powerUp(type: string)
    {
        switch (type)
        {
            case 'LongRocket':
                this.posX -= 18;
                this._image.texture = this._longRocket;
                setTimeout(function () {
                    this._image.texture = this._normalRocket;
                    this.posX += 18;
                }.bind(this), 15000);
                break;
        }
    }

    // Base >>--------------------------------------------------------------<<<<

    // Events >>------------------------------------------------------------<<<<

    // Private >>-----------------------------------------------------------<<<<
}