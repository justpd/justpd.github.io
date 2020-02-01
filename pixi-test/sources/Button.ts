import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import any = PIXI.utils.isMobile.any;
import Texture = PIXI.Texture;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import { Game } from "./Game";

export class Button extends Container {

    private _event: String;
    private _timeToWork: number;
    private _sprite: Sprite;
    private _auto: boolean;
    private _text: Text;
    private _anchor: number[];
    constructor(event: String, texture: Texture, text: string, anchorX: number, anchorY: number, timeToWork: number = 100, auto: boolean = true) {
        super();
        this._event = event;
        this._sprite = new Sprite(texture);
        this._timeToWork = timeToWork;
        this._anchor = [anchorX, anchorY];
        this._auto = auto;
        this._text = new Text(text);

        this.configure();
    }

    protected configure(): void {
        this._sprite.interactive = true;
        this._sprite.buttonMode = true;
        this._sprite.anchor.set(this._anchor[0], this._anchor[1]);
        this._sprite.on('pointerup', function () {
            this.emit(this._event);
            this._sprite.alpha = 0.5;
            this._text.alpha = 0.5;
            this._sprite.interactive = false;
            if (this._auto)
            {
                setTimeout(function () {
                    this._sprite.alpha = 0.8;
                    this._text.alpha = 0.8;
                    this._sprite.interactive = true;
                }.bind(this), this._timeToWork);
            }
            
        }.bind(this), this);

        this._sprite.on('pointerdown', function () {
            this._sprite.alpha = 0.5;
            this._text.alpha = 0.5;
        }.bind(this));

        this._sprite.on('pointerupoutside', function () {
            this._sprite.alpha = 1;
            this._text.alpha = 1;
        }.bind(this));

        this._sprite.on('mouseout', function () {
            this._sprite.alpha = 1;
            this._text.alpha = 1;
        }.bind(this));

        this._sprite.on('mouseover', function () {
            this._sprite.alpha = 0.8;
            this._text.alpha = 0.8;
        }.bind(this));

        let style = new TextStyle({ fontFamily: "MKX", fill: ['#e3ad45', '#efd85a'], fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_VERTICAL, fontSize: 48, dropShadow: true, align: 'center'});
        this._text.anchor.set(0.5);
        this._text.style = style;
        this._text.position.set(0, this._sprite.height/2 + 5);
        
        this.addChild(this._sprite);
        this.addChild(this._text);


        
    }

    public show() 
    {
        this.visible = true;
    }

    public hide() 
    {
        this.visible = false;
    }

    public reset()
    {
        this._sprite.alpha = 1;
        this._sprite.interactive = true;
    }

}