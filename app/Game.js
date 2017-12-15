var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Rocket", "./Level", "./Ball", "./UserBar", "./Button", "./Menu"], function (require, exports, Rocket_1, Level_1, Ball_1, UserBar_1, Button_1, Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author Вячеслав И.Э.
     * @version 1.0
     * @since 08 Октябрь 2017
     */
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Game = (function (_super) {
        __extends(Game, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Game() {
            var _this = _super.call(this) || this;
            _this._score = 0;
            _this._lives = 3;
            _this._stage = 1;
            _this._cheatMode = false;
            _this._pause = false;
            _this._music = true;
            _this._bgImage = Sprite.fromImage('assets/bg.png');
            _this._menu = new Menu_1.Menu();
            _this._rocket = new Rocket_1.Rocket();
            _this._level = new Level_1.Level();
            _this._ball = new Ball_1.Ball();
            _this._userBar = new UserBar_1.UserBar();
            _this._pauseButton = new Button_1.Button(Game.EVENT_GAME_PAUSE, 'Pause', 100, 1, 0);
            _this._pauseButton.on(Game.EVENT_GAME_PAUSE, _this.gamePause, _this);
            _this._actionButton = new Button_1.Button(Game.EVENT_GAME_ACTION, 'Action', 100, 0, 0);
            _this._actionButton.on(Game.EVENT_GAME_ACTION, _this.gameAction, _this);
            _this._soundButton = new Button_1.Button(Game.EVENT_GAME_SOUND, 'Sound', 100, 0.5, 0);
            _this._soundButton.on(Game.EVENT_GAME_SOUND, _this.gameSound, _this);
            _this._cheatButton = new Button_1.Button(Game.EVENT_GAME_CHEAT, 'Cheat', 100, 0.5, 0);
            _this._cheatButton.on(Game.EVENT_GAME_CHEAT, _this.gameCheat, _this);
            _this._menu.on('pointerup', _this.menuHide, _this);
            _this._level.on('Collision', _this.eventCollision, _this);
            _this._level.on('NextLevel', _this.nextStage, _this);
            _this._level.on('PowerUp', _this.eventPowerUp, _this);
            _this._ball.on('BallOut', _this.eventBallOut, _this);
            _this.interactive = true;
            _this.on('pointerdown', _this.eventPointerDown, _this);
            _this.on('pointerup', _this.eventPointerUp, _this);
            setInterval(_this.Update.bind(_this), 1000 / 60);
            _this.configurate();
            return _this;
        }
        Game.prototype.configurate = function () {
            createjs.Sound.on("fileload", this.loadHandler, this);
            createjs.Sound.registerSound({ src: "assets/collision.wav", id: "collision" });
            createjs.Sound.registerSound({ src: "assets/pong.wav", id: "pong" });
            createjs.Sound.registerSound({ src: "assets/ballOut.wav", id: "ballOut" });
            createjs.Sound.registerSound({ src: "assets/loop.wav", id: "loop" });
            this._borderImage = Sprite.fromImage('assets/border.png');
            this._pauseButton.position.set(Game.WIDTH - 4, 96);
            this._actionButton.position.set(3, 96);
            this._soundButton.position.set(Game.WIDTH / 2 - 114, 56);
            this._cheatButton.position.set(Game.WIDTH / 2 + 114, 56);
            this.addChild(this._menu);
            this._userBar.lives.text = 'LIVES: ' + this._lives;
            this._userBar.score.text = 'SCORE: ' + this._score;
            this._userBar.stage.text = 'STAGE: ' + this._stage;
            this._userBar.message.text = 'PRESS Z BUTTON TO START!';
        };
        Game.prototype.loadHandler = function () {
            createjs.Sound.play('loop', createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.2);
        };
        Game.prototype.menuHide = function () {
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
        };
        Game.prototype.gamePause = function () {
            this._pause = !this._pause;
            if (this._pause)
                this._userBar.message.text = 'GAME PAUSED!';
            else
                this._userBar.message.text = '';
        };
        Game.prototype.gameAction = function () {
            if (this._ball.onTheRocket) {
                this._ball.push();
                this._userBar.message.text = '';
            }
        };
        Game.prototype.gameSound = function () {
            this._music = !this._music;
            createjs.Sound.muted = !this._music;
        };
        Game.prototype.gameCheat = function () {
            this._cheatMode = !this._cheatMode;
        };
        Game.prototype.eventPointerDown = function (event) {
            console.log(event);
            var mouseX = event.data.global.x;
            var mouseY = event.data.global.y;
            var width = event.data.originalEvent.target.width;
            var height = event.data.originalEvent.target.height;
            console.log(mouseX, width);
            if (mouseY >= height / 2) {
                if (mouseX < width / 2) {
                    this._rocket.velocity = -1;
                }
                if (mouseX > width / 2) {
                    this._rocket.velocity = 1;
                }
            }
        };
        Game.prototype.eventPointerUp = function (event) {
            this._rocket.velocity = 0;
        };
        // Base >>--------------------------------------------------------------<<<<
        Game.prototype.keyboardInput = function (event) {
            if (event.keyCode == 37 && event.type == 'keydown') {
                this._rocket.velocity = -1;
            }
            else if (event.keyCode == 39 && event.type == 'keydown') {
                this._rocket.velocity = 1;
            }
            else if ((event.keyCode == 37 || event.keyCode == 39) && event.type == 'keyup') {
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
        };
        Game.prototype.Update = function () {
            if (!this._pause) {
                if (this._ball.onTheRocket) {
                    this._ball.posX = this._rocket.posX + this._rocket.width / 2 - this._ball.width / 2;
                }
                if (this._cheatMode) {
                    if (this._rocket.posX + this._rocket.width / 2 < this._ball.posX - 20) {
                        this._rocket.velocity = 1;
                    }
                    else if (this._rocket.posX + this._rocket.width / 2 > this._ball.posX + 20) {
                        this._rocket.velocity = -1;
                    }
                    else {
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
        };
        Game.prototype.gameEnd = function () {
            this._score = 0;
            this._stage = 1;
            this._lives = 3;
            this._userBar.score.text = 'SCORE: ' + this._score;
            this._userBar.lives.text = 'LIVES: ' + this._lives;
            this._userBar.stage.text = 'STAGE: ' + this._stage;
            this._userBar.message.text = 'PRESS Z BUTTON TO START!';
            this._rocket.reset();
            this._ball.reset(this._rocket.posX + this._rocket.width / 2 - this._ball.width / 2, Game.HEIGHT - 48);
            this._level.setStage(this._stage);
        };
        Game.prototype.nextStage = function () {
            this._stage += 1;
            this._lives += 2;
            this._userBar.score.text = 'SCORE: ' + this._score;
            this._userBar.lives.text = 'LIVES: ' + this._lives;
            this._userBar.stage.text = 'STAGE: ' + this._stage;
            this._rocket.reset();
            this._ball.reset(this._rocket.posX + this._rocket.width / 2 - this._ball.width / 2, Game.HEIGHT - 48);
            this._level.setStage(this._stage);
        };
        // Events >>------------------------------------------------------------<<<<
        Game.prototype.eventCollision = function (velocityX, velocityY, blockDestroyed) {
            if (!this._ball.onTheRocket) {
                this._ball.velocityY = velocityY;
                this._ball.velocityX = velocityX;
                if (blockDestroyed) {
                    this._score += 100;
                    this._userBar.score.text = 'SCORE: ' + this._score;
                }
            }
        };
        Game.prototype.eventBallOut = function () {
            this._ball.reset(this._rocket.posX + this._rocket.width / 2 - this._ball.width / 2, Game.HEIGHT - 48);
            this._lives -= 1;
            this._userBar.lives.text = 'LIVES: ' + this._lives;
            if (this._lives <= 0) {
                this.gameEnd();
            }
        };
        Game.prototype.eventPowerUp = function (power) {
            if (power == 'LongRocket')
                this._rocket.powerUp('LongRocket');
        };
        // Params >>------------------------------------------------------------<<<<
        Game.WIDTH = 512;
        Game.HEIGHT = 512;
        Game.EVENT_GAME_PAUSE = 'GamePause';
        Game.EVENT_GAME_ACTION = 'GameAction';
        Game.EVENT_GAME_SOUND = 'GameSound';
        Game.EVENT_GAME_CHEAT = 'GameCheat';
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map