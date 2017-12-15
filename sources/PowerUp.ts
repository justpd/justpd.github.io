import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import BaseTexture = PIXI.BaseTexture;
import Texture = PIXI.Texture;

export class PowerUp extends Container
{
    // Params >>------------------------------------------------------------<<<<
    private _image: Sprite;
    private _animation: any[];
    public speed: number = 2;
    public posX: number;
    public posY: number;
    public active: boolean = true;
    public power: string;

    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor(x: number, y: number)
    {
        super();
        this.posX = x - this.width/2;
        this.posY = y;
        this.configurate();
    }

    protected configurate():void
    {
        this._animation = [];
        for (let i=0; i < 18;i++)
        {
            this._animation.push(new PIXI.Rectangle(20 * i,0,20,14));
        }

        this._image = Sprite.fromImage('assets/powerUp.png');
        this._image.position.set(this.posX, this.posY);
        this._image.texture = new Texture(BaseTexture.fromImage('assets/powerUp.png'));
        this._image.texture.frame = this._animation[0];
        this.power = 'LongRocket';

        this.addChild(this._image);
        this.animate();
    }

    protected animate()
    {
        for (let i=1; i < 9;i++)
        {
            setTimeout(function () {
                if (this.active)
                    this._image.texture.frame = this._animation[i];
            }.bind(this), i * 200);
        }
        setTimeout(function () {
            if (this.active)
            {
                this.animate();
            }
        }.bind(this), 1800)
    }

    public move():void
    {
        this.posY += this.speed;
        this._image.position.set(this.posX, this.posY);
    }


    // Base >>--------------------------------------------------------------<<<<

    // Events >>------------------------------------------------------------<<<<

    // Private >>-----------------------------------------------------------<<<<
}