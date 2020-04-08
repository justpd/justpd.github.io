import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import Sound = createjs.Sound;
import { NetworkProvider } from "./NetworkProvider"
declare let TweenMax: any;
declare let TimelineMax: any;


export class Game extends Container
{
    public static WIDTH: number = 1600;
    public static HEIGHT: number = 900;
    public static RES: any;

    private _background: Sprite;
    private _textStyle: TextStyle;
    private _testText: Text;
    private _networkProvider: NetworkProvider;

    // ==== Init ============================================= //
    /**
     * @private
     * @param resources - loader resources
     */
    constructor(resources: any)
    {
        super();
        Game.RES = resources;
        this._networkProvider = new NetworkProvider();
        this._networkProvider.on(NetworkProvider.EVENT_CONNECTED, this.eventConnected, this);
        this._networkProvider.on(NetworkProvider.EVENT_DISCONNECTED, this.eventDisconnected, this);
        this._networkProvider.on(NetworkProvider.EVENT_DATA, this.eventData, this);

        this.configurator();

        this.openConnection();
    }

    // ==== Base ============================================= //

    protected configurator()
    {
        // ==== Initing Childs ============================================= //
        this._background = new Sprite(Game.RES._background.texture);
        this._testText = new Text("100");

        // ==== Configuring Childs =========================================== //
        this._background.width = Game.WIDTH;
        this._background.height = Game.HEIGHT;
        this._background.alpha = 0.6;

        this._textStyle = new TextStyle({
            fontSize: 80, fontFamily: "Visitor TT2 BFK", fill: '#ffffff', align: "center", fontWeight: "600",
            dropShadow: true,
            dropShadowDistance: 6,
            dropShadowBlur: 5,
        });

        this._testText.style = this._textStyle;
        this._testText.anchor.set(0.5);
        this._testText.position.set(Game.WIDTH * 0.5, Game.HEIGHT * 0.5);

        // ==== Adding Childs ================================================ //
        this.addChild(this._background);
        this.addChild(this._testText);
    }


    protected openConnection(): void
    {
        console.log('Game >>> Trying to connect with Server: 62.68.128.229:9090.');
        this._networkProvider.openConnection('ws://62.68.128.229:9090/ws');
    }

    // ==== Events ================================================ //

    protected eventConnected(): void
    {
        console.log('Game >>> Server connection succes.');
    }

    protected eventDisconnected(): void
    {
        console.log('Game >>> Server connection closed.');
    }

    protected eventData(event: any): void
    {
        console.log('Game >>> Data from server.');
        console.log(event);

        const _class = event.CLASS_NAME;
        const classSwitcher = (_class: string) => ({
            "SERVER LOG": this.dataOnServerLog(event),
        });

        classSwitcher(_class);
    }

    // ==== Data Classes ================================================ //

    protected dataOnServerLog(event: any)
    {
        this._testText.text = event.DATA;
    }
}