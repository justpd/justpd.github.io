import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import TextStyle = PIXI.TextStyle;
import Text = PIXI.Text;
import { Game } from "./Game";
import { Button } from "./Button";


export class Menu extends Container
{

    private gameManager: Game;

    // ------- UI -------
    private UI_TitleBack : Sprite;
    private UI_TextureBox : Texture;
    private UI_ButtonStart : Button;
    private UI_ButtonScore: Button;
    private UI_ButtonSettings: Button;
    private UI_TitleText: Text;
    // ------- UI -------


    /**
     * @private
     */
    constructor()
    {
        super();

        this.UI_TitleBack = new Sprite(Game.RESOURCES.titleLine.texture);
        this.UI_TextureBox = Game.RESOURCES.buttonBox.texture
        this.UI_TitleText = new Text("SPHERES OF IMMORTAL");

        this.setupUI();
    }
    
    private setupUI()
    {
        this.UI_TitleBack.anchor.set(0.5, 0);
        this.UI_TitleBack.x = Game.WIDTH/2;
        this.UI_TitleBack.y = Game.HEIGHT * 0.157;

        this.UI_ButtonStart = new Button('GameStart', this.UI_TextureBox, "START GAME", 0.5, 0);
        this.UI_ButtonStart.on('GameStart', this.gameStart, this);
        this.UI_ButtonStart.position.set(Game.WIDTH / 2, Game.HEIGHT * 0.36)

        this.UI_ButtonScore = new Button('ShowScore', this.UI_TextureBox, "HIGH SCORES", 0.5, 0);
        this.UI_ButtonScore.on('ShowScore', this.showScore, this);
        this.UI_ButtonScore.position.set(Game.WIDTH / 2, Game.HEIGHT * 0.524)

        this.UI_ButtonSettings = new Button('ShowSettings', this.UI_TextureBox, "SETTINGS", 0.5, 0);
        this.UI_ButtonSettings.on('ShowSettings', this.showSettings, this);
        this.UI_ButtonSettings.position.set(Game.WIDTH / 2, Game.HEIGHT * 0.688)

        let style = new TextStyle({ fontFamily: "MKX", fill: ['#e3ad45', '#efd85a'], fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_VERTICAL, fontSize: 60, dropShadow: true, align: 'center' });
        this.UI_TitleText.anchor.set(0.5, 0);
        this.UI_TitleText.style = style;
        this.UI_TitleText.position.set(Game.WIDTH / 2, Game.HEIGHT * 0.2);

        this.addChild(this.UI_TitleBack);
        this.addChild(this.UI_ButtonStart);
        this.addChild(this.UI_ButtonScore);
        this.addChild(this.UI_ButtonSettings);
        this.addChild(this.UI_TitleText);
    }

    private gameStart()
    {
        console.log("Started");
    }

    private showScore()
    {
        console.log("Score");
    }

    private showSettings()
    {
        console.log("Settings");
    }

    public Animate()
    {
        // let color: string = "#e3ad45".replace(/45/g, function () { return ((Math.random() * 16)).toString(16); });
        // console.log("#e3" +  + "45");
        // console.log((Math.random() * 16).toString(16));
        // this.UI_TitleText.style.fill = [color, '#ffffff'];
        // console.log('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    }

}