/**
 * @author Вячеслав И.Э.
 * @version 1.0
 * @since 08 Октябрь 2017
 */
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Rocket} from "./Rocket";
import {Level} from "./Level";
import {Ball} from "./Ball";
import {UserBar} from "./UserBar";
import {Button} from "./Button";
import {Menu} from "./Menu";

export class Game extends Container
{
    // Params >>------------------------------------------------------------<<<<

    public static WIDTH:number = 512;
    public static HEIGHT:number = 512;
    public static EVENT_GAME_PAUSE = 'GamePause';
    public static EVENT_GAME_ACTION = 'GameAction';
    public static EVENT_GAME_SOUND = 'GameSound';
    public static EVENT_GAME_CHEAT = 'GameCheat';

    private _bgImage: Sprite;
    private _borderImage: Sprite;
    private _rocket: Rocket;
    private _level: Level;
    private _ball: Ball;
    private _userBar: UserBar;
    private _pauseButton: Button;
    private _actionButton: Button;
    private _soundButton: Button;
    private _cheatButton: Button;
    private _menu: Menu;
    private _score: number = 0;
    private _lives: number = 3;
    private _stage: number = 1;
    private _cheatMode: boolean = false;
    private _pause: boolean = false;
    private _music: boolean = true;
    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor()
    {
        super();
        this._bgImage = Sprite.fromImage('assets/bg.png');
        this._menu = new Menu();
        this._rocket = new Rocket();
        this._level = new Level();
        this._ball = new Ball();
        this._userBar = new UserBar();
        this._pauseButton = new Button(Game.EVENT_GAME_PAUSE, 'Pause', 100, 1, 0);
        this._pauseButton.on(Game.EVENT_GAME_PAUSE, this.gamePause, this);
        this._actionButton = new Button(Game.EVENT_GAME_ACTION, 'Action', 100, 0, 0);
        this._actionButton.on(Game.EVENT_GAME_ACTION, this.gameAction, this);
        this._soundButton = new Button(Game.EVENT_GAME_SOUND, 'Sound', 100, 0.5, 0);
        this._soundButton.on(Game.EVENT_GAME_SOUND, this.gameSound, this);
        this._cheatButton = new Button(Game.EVENT_GAME_CHEAT, 'Cheat', 100, 0.5, 0);
        this._cheatButton.on(Game.EVENT_GAME_CHEAT, this.gameCheat, this);
        this._menu.on('pointerup', this.menuHide, this);

        this._level.on('Collision', this.eventCollision, this);
        this._level.on('NextLevel', this.nextStage, this);
        this._level.on('PowerUp', this.eventPowerUp, this);
        this._ball.on('BallOut', this.eventBallOut, this);
        this.interactive = true;
        this.on('pointerdown', this.eventPointerDown, this);
        this.on('pointerup', this.eventPointerUp, this);
        setInterval(this.Update.bind(this), 1000/60);
        this.configurate();
    }

    protected configurate():void
    {
        createjs.Sound.on("fileload", this.loadHandler, this);
        createjs.Sound.registerSound({src:"assets/collision.wav", id:"collision"});
        createjs.Sound.registerSound({src:"assets/pong.wav", id:"pong"});
        createjs.Sound.registerSound({src:"assets/ballOut.wav", id:"ballOut"});
        createjs.Sound.registerSound({src:"assets/loop.wav", id:"loop"});

         this._borderImage = Sprite.fromImage('assets/border.png');

        this._pauseButton.position.set(Game.WIDTH - 4, 96);
        this._actionButton.position.set(3, 96);
        this._soundButton.position.set(Game.WIDTH/2 - 114, 56);
        this._cheatButton.position.set(Game.WIDTH/2 + 114, 56);
        this.addChild(this._menu);
        this._userBar.lives.text = 'LIVES: ' + this._lives;
        this._userBar.score.text = 'SCORE: ' + this._score;
        this._userBar.stage.text = 'STAGE: ' + this._stage;
        this._userBar.message.text = 'PRESS Z BUTTON TO START!';
    }

    protected loadHandler()
    {
        createjs.Sound.play('loop', createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.2);
    }

    protected menuHide()
    {
        this.removeChild(this._menu);
        this.addChild(this._bgImage);
        this.addChild(this._ball);
        this.addChild(this._rocket);
        this.addChild(this._level);
        this.addChild(this._borderImage);
        this.addChild(this._userBar);
        this.addChild(this._pauseButton);
        this.addChild(this._actionButton);
        this.addChild(this._soundButton);
        this.addChild(this._cheatButton);
    }

    protected gamePause()
    {
        this._pause = !this._pause;
        if (this._pause)
            this._userBar.message.text = 'GAME PAUSED!';
        else
            this._userBar.message.text = '';
    }

    protected gameAction()
    {
        if (this._ball.onTheRocket)
        {
            this._ball.push();
            this._userBar.message.text = '';
        }
    }

    protected gameSound()
    {
        this._music = !this._music;
        createjs.Sound.muted = !this._music;
    }

    protected gameCheat()
    {
        this._cheatMode = !this._cheatMode;
    }

    protected eventPointerDown(event: any)
    {
        console.log(event);
        let mouseX = event.data.global.x;
        let mouseY = event.data.global.y;
        let width = event.data.originalEvent.target.width;
        let height = event.data.originalEvent.target.height;
        console.log(mouseX, width);
        if (mouseY >= height/2)
        {
            if (mouseX < width/2)
            {
                this._rocket.velocity = -1;
            }
            if (mouseX > width/2)
            {
                this._rocket.velocity = 1;
            }
        }
    }

    protected eventPointerUp(event: any)
    {
        this._rocket.velocity = 0;
    }

    // Base >>--------------------------------------------------------------<<<<
    public keyboardInput(event: KeyboardEvent)
    {
        if (event.keyCode == 37 && event.type == 'keydown') {
            this._rocket.velocity = -1;
        }
        else if (event.keyCode == 39 && event.type == 'keydown') {
            this._rocket.velocity = 1;
        }
        else if ((event.keyCode == 37 || event.keyCode == 39) && event.type == 'keyup')
        {
            this._rocket.velocity = 0;
        }

        else if (event.keyCode == 38 && event.type == 'keydown') {
            this._cheatMode = !this._cheatMode;
        }
        else if (event.keyCode == 32 && event.type == 'keydown') {
            this.gamePause();
        }
        else if (event.keyCode == 40 && event.type == 'keydown') {
            this.gameSound();
        }
        else if (event.keyCode == 90 && event.type == 'keydown') {
            this.gameAction();
        }
    }

    protected Update()
    {
        if (!this._pause)
        {
            if (this._ball.onTheRocket)
            {
                this._ball.posX = this._rocket.posX + this._rocket.width/2 - this._ball.width/2;
            }
            if (this._cheatMode)
            {
                if (this._rocket.posX + this._rocket.width/2 < this._ball.posX - 20)
                {
                    this._rocket.velocity = 1;
                }
                else if (this._rocket.posX + this._rocket.width/2 > this._ball.posX + 20)
                {
                    this._rocket.velocity = -1;
                }
                else
                {
                    this._rocket.velocity = 0;
                }
            }
            this._level.powerUps.forEach(function (element) {
               element.move();
            });
            this._rocket.move();
            this._ball.move();
            this._level.checkCollision(this._ball, this._rocket);
        }
    }

    protected gameEnd()
    {
        this._score = 0;
        this._stage = 1;
        this._lives = 3;
        this._userBar.score.text = 'SCORE: ' + this._score;
        this._userBar.lives.text = 'LIVES: ' + this._lives;
        this._userBar.stage.text = 'STAGE: ' + this._stage;
        this._userBar.message.text = 'PRESS Z BUTTON TO START!';
        this._rocket.reset();
        this._ball.reset(this._rocket.posX + this._rocket.width/2 - this._ball.width/2, Game.HEIGHT - 48);
        this._level.setStage(this._stage);
    }

    protected nextStage()
    {
        this._stage += 1;
        this._lives += 2;
        this._userBar.score.text = 'SCORE: ' + this._score;
        this._userBar.lives.text = 'LIVES: ' + this._lives;
        this._userBar.stage.text = 'STAGE: ' + this._stage;
        this._rocket.reset();
        this._ball.reset(this._rocket.posX + this._rocket.width/2 - this._ball.width/2, Game.HEIGHT - 48);
        this._level.setStage(this._stage);
    }

    // Events >>------------------------------------------------------------<<<<
    protected eventCollision(velocityX: any, velocityY: any, blockDestroyed: boolean)
    {
        if (!this._ball.onTheRocket)
        {
            this._ball.velocityY = velocityY;
            this._ball.velocityX = velocityX;
            if (blockDestroyed)
            {
                this._score += 100;
                this._userBar.score.text = 'SCORE: ' + this._score;
            }
        }
    }

    protected eventBallOut()
    {
        this._ball.reset(this._rocket.posX + this._rocket.width/2 - this._ball.width/2, Game.HEIGHT - 48);
        this._lives -= 1;
        this._userBar.lives.text = 'LIVES: ' + this._lives;
        if (this._lives <= 0)
        {
            this.gameEnd();
        }
    }

    protected eventPowerUp(power: string)
    {
        if (power == 'LongRocket')
            this._rocket.powerUp('LongRocket');
    }
    // Private >>-----------------------------------------------------------<<<<
}