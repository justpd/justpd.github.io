import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import TextStyle = PIXI.TextStyle;
import {Game} from "./Game";


export class Menu extends Container
{
    // Params >>------------------------------------------------------------<<<<

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
        this.interactive = true;
        let background :Sprite = Sprite.fromImage('assets/menu.png');
        let style = new TextStyle({fill: '#ffffff', fontSize: 18, fontWeight: '600', dropShadow: true, align: 'center'});
        let menuText = new PIXI.Text('CONTROLS:\nZ - START, LEFT/RIGHT ARROWS - MOVEMENT\nDOWN ARROW - SOUND, UP ARROW - CHEAT.\n\n' +
            'MOBILE:\nZ, SOUND, CHEAT, PAUSE BUTTONS ARE ON THE PIPE\n TAP LEFT OR RIGHT (NEAR PADDLE) TO MOVE.\n\n TAP OR CLICK TO CONTINUE!');
        menuText.anchor.set(0.5);
        menuText.style = style;
        menuText.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this.addChild(background);
        this.addChild(menuText);
    }

    // Base >>--------------------------------------------------------------<<<<

    // Events >>------------------------------------------------------------<<<<

    // Private >>-----------------------------------------------------------<<<<
}