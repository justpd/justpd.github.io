import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;

export class Brick extends Container
{
    // Params >>------------------------------------------------------------<<<<
    private _image: Sprite;
    private _strength: number;
    public posX: number;
    public posY: number;
    public powerBrick: boolean;
    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor(x:number, y:number, strength: number)
    {
        super();
        this.posX = x;
        this.posY = y;
        this._strength = strength;
        if (this._strength == 3)
        {
            this.powerBrick = true;
        }
        this.configurate();
    }

    protected configurate():void
    {
        this._image = new Sprite();
        this._image.position.set(this.posX, this.posY);
        this.setImage();
        this.addChild(this._image);
    }

    protected setImage():void
    {
        this._image.texture = Texture.fromImage('assets/brick_' + (this._strength-1) + '.png');
    }

    public dealDamage():boolean
    {
        this._strength -= 1;
        return this._strength <= 0;
    }


    // Base >>--------------------------------------------------------------<<<<

    // Events >>------------------------------------------------------------<<<<

    // Private >>-----------------------------------------------------------<<<<
}