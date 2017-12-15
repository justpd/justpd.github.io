import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import TextStyle = PIXI.TextStyle;
import {Game} from "./Game";

export class UserBar extends Container
{
    // Params >>------------------------------------------------------------<<<<
    public score: PIXI.Text;
    public lives: PIXI.Text;
    public stage: PIXI.Text;
    public message: PIXI.Text;
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
        let style = new TextStyle({fill: '#ffffff', fontSize: 28, fontWeight: '600', dropShadow: true, align: 'center'});
        this.score = new PIXI.Text('Score: 0');
        this.lives = new PIXI.Text('Lives: 0');
        this.stage = new PIXI.Text('Stage: 0');
        this.message = new PIXI.Text('Press Space to continue !');
        this.score.position.set(5,10);
        this.lives.anchor.set(1, 0);
        this.lives.position.set(Game.WIDTH - 5, 10);
        this.stage.anchor.set(0.5);
        this.stage.position.set(Game.WIDTH/2, 68);
        this.message.anchor.set(0.5);
        this.message.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this.lives.style = style;
        this.score.style = style;
        this.stage.style = new TextStyle({fill: '#ffffff', fontSize: 18, fontWeight: '600', dropShadow: false, align: 'center'});
        this.message.style = style;
        this.addChild(this.score);
        this.addChild(this.lives);
        this.addChild(this.stage);
        this.addChild(this.message);
    }

    // Base >>--------------------------------------------------------------<<<<

    // Events >>------------------------------------------------------------<<<<

    // Private >>-----------------------------------------------------------<<<<
}