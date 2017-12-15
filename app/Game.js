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
define(["require", "exports", "./Rocket", "./Level", "./Ball", "./UserBar"], function (require, exports, Rocket_1, Level_1, Ball_1, UserBar_1) {
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
            _this._rocket = new Rocket_1.Rocket();
            _this._level = new Level_1.Level();
            _this._ball = new Ball_1.Ball();
            _this._userBar = new UserBar_1.UserBar();
            _this.interactive = true;
            _this.on('pointerdown', _this.eventPointerDown, _this);
            _this.on('pointerup', _this.eventPointerUp, _this);
            _this._level.on('Collision', _this.eventCollision, _this);
            _this._level.on('NextLevel', _this.nextStage, _this);
            _this._level.on('PowerUp', _this.eventPowerUp, _this);
            _this._ball.on('BallOut', _this.eventBallOut, _this);
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
            this._bgImage = Sprite.fromImage('assets/bg.png');
            var border = Sprite.fromImage('assets/border.png');
            this.addChild(this._bgImage);
            this.addChild(border);
            this.addChild(this._ball);
            this.addChild(this._rocket);
            this.addChild(this._level);
            this.addChild(this._userBar);
            this._userBar.lives.text = 'Lives: ' + this._lives;
            this._userBar.score.text = 'Score: ' + this._score;
            this._userBar.stage.text = 'Stage: ' + this._stage;
            this._userBar.message.text = 'Press Z to start!';
        };
        Game.prototype.loadHandler = function () {
            createjs.Sound.play('loop', createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.2);
        };
        Game.prototype.eventPointerDown = function (event) {
            console.log(event);
            var mouseX = event.data.originalEvent.clientX;
            var width = event.data.originalEvent.target.width;
            console.log(mouseX, width);
            if (mouseX <= width / 2 - 128) {
                this._rocket.velocity = -1;
            }
            if (mouseX >= width / 2 + 128) {
                this._rocket.velocity = 1;
            }
            else if (mouseX < width / 2 + 128 && mouseX > width / 2 - 128 && this._ball.onTheRocket) {
                this._ball.push();
                this._userBar.message.text = '';
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
                this._pause = !this._pause;
                if (this._pause)
                    this._userBar.message.text = 'Press Space to continue!';
                else
                    this._userBar.message.text = '';
            }
            else if (event.keyCode == 40 && event.type == 'keydown') {
                this._music = !this._music;
                createjs.Sound.muted = !this._music;
            }
            else if (event.keyCode == 90 && event.type == 'keydown') {
                if (this._ball.onTheRocket) {
                    this._ball.push();
                    this._userBar.message.text = '';
                }
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
            this._userBar.score.text = 'Score: ' + this._score;
            this._userBar.lives.text = 'Lives: ' + this._lives;
            this._userBar.stage.text = 'Stage: ' + this._stage;
            this._userBar.message.text = 'Press Z to start!';
            this._rocket.reset();
            this._ball.reset(this._rocket.posX + this._rocket.width / 2 - this._ball.width / 2, Game.HEIGHT - 48);
            this._level.setStage(this._stage);
        };
        Game.prototype.nextStage = function () {
            this._stage += 1;
            this._lives += 2;
            this._userBar.score.text = 'Score: ' + this._score;
            this._userBar.lives.text = 'Lives: ' + this._lives;
            this._userBar.stage.text = 'Stage: ' + this._stage;
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
                    this._userBar.score.text = 'Score: ' + this._score;
                }
            }
        };
        Game.prototype.eventBallOut = function () {
            this._ball.reset(this._rocket.posX + this._rocket.width / 2 - this._ball.width / 2, Game.HEIGHT - 48);
            this._lives -= 1;
            this._userBar.lives.text = 'Lives: ' + this._lives;
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
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map