import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Ticker = PIXI.Ticker
import { Menu } from "./Menu";

export class Game extends Container
{
    // Params >>------------------------------------------------------------<<<<

    public static WIDTH: number = 1024;
    public static HEIGHT: number = 1024;
    public static RESOURCES: any;

    // private _image: Sprite;
    private UI_back: Sprite;
    private _ticker: Ticker;

    private SC_Menu: Menu;

    private _x = 0;


    /**
     * @private
     */
    constructor(resources: any)
    {
        super();
        Game.RESOURCES = resources;
        this.UI_back = new Sprite(Game.RESOURCES.stageBackground.texture);
        this.SC_Menu = new Menu();
        console.log(this.UI_back.width);
        
        this._ticker = Ticker.shared;
        this._ticker.add(this.Update, this);
        this._ticker.deltaTime = 100;
        this._ticker.start();
        
        this.addChild(this.UI_back);
        this.addChild(this.SC_Menu);
    }

    public eventKeyboardInput(event: KeyboardEvent): void {
        // if (event.keyCode == 83 && event.type == 'keydown') {
        //     this.removeChild(this._image);
        // }
        // else if (event.keyCode == 87 && event.type == 'keydown') {
        //     this.addChild(this._image);
        // }
    }

    public Update() :void 
    {
        this.SC_Menu.Animate();
    }
}