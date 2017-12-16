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
define(["require", "exports", "./Game", "./Brick", "./PowerUp", "./Enemy"], function (require, exports, Game_1, Brick_1, PowerUp_1, Enemy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Level = (function (_super) {
        __extends(Level, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Level() {
            var _this = _super.call(this) || this;
            _this.powerUps = [];
            _this.enemies = [];
            _this.configurate();
            return _this;
        }
        Level.prototype.configurate = function () {
            this.buildStages();
            this._levelMatrix = this._stages[0];
            this.setBricks();
        };
        // Base >>--------------------------------------------------------------<<<<
        Level.prototype.setBricks = function () {
            this._bricks = [];
            for (var i = 0; i < this._levelMatrix.length; i++) {
                for (var j = 0; j < this._levelMatrix[i].length; j++) {
                    if (this._levelMatrix[i][j] != 0) {
                        var newBrick = new Brick_1.Brick((j + 1) * 32, i * 16 + 84, this._levelMatrix[i][j]);
                        this._bricks.push(newBrick);
                        this.addChild(newBrick);
                    }
                }
            }
        };
        Level.prototype.removeBricks = function () {
            for (var i = 0; i < this._bricks.length; i++) {
                this.removeChild(this._bricks[i]);
            }
        };
        Level.prototype.buildStages = function () {
            this._stages = [];
            this._stages.push([
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2],
                [0, 0, 0, 2, 2, 0, 0, 4, 0, 0, 2, 2],
                [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2],
                [0, 0, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1],
            ]);
            this._stages.push([
                [],
                [],
                [],
                [],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2],
                [4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4],
                [4, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 4],
                [4, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 4],
                [4, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 4],
                [4, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 4],
                [4, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 4],
                [4, 1, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 1, 4],
                [4, 1, 1, 1, 4, 0, 0, 0, 0, 4, 1, 1, 1, 4],
                [4, 4, 4, 4, 4, 0, 0, 0, 0, 4, 4, 4, 4, 4],
            ]);
            this._stages.push([
                [],
                [],
                [],
                [],
                [5, 5, 5, 5, 2, 1, 1, 1, 1, 2, 5, 5, 5, 5],
                [5, 5, 5, 2, 1, 1, 0, 0, 1, 1, 2, 5, 5, 5],
                [5, 5, 2, 1, 1, 0, 0, 0, 0, 1, 1, 2, 5, 5],
                [5, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 5],
                [2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
                [5, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 5],
                [5, 5, 2, 1, 1, 0, 0, 0, 0, 1, 1, 2, 5, 5],
                [5, 5, 5, 2, 1, 1, 0, 0, 1, 1, 2, 5, 5, 5],
                [5, 5, 5, 5, 2, 1, 1, 1, 1, 2, 5, 5, 5, 5],
            ]);
        };
        Level.prototype.setStage = function (stage) {
            this._levelMatrix = this._stages[stage - 1];
            this.removeBricks();
            this.setBricks();
        };
        // Calculations >>------------------------------------------------------------<<<<
        Level.prototype.rectangleCollision = function (x1, y1, width1, height1, x2, y2, width2, height2, smooth) {
            if (smooth) {
                return y1 <= y2 + height2
                    && y1 + height1 >= y2
                    && x1 + width1 >= x2
                    && x1 <= x2 + width2;
            }
            else
                return y1 < y2 + height2
                    && y1 + height1 > y2
                    && x1 + width1 > x2
                    && x1 < x2 + width2;
        };
        Level.prototype.checkCollision = function (ball, rocket) {
            var velocityX;
            var velocityY;
            for (var i = 0; i < this._bricks.length; i++) {
                var collision = void 0;
                if (this.rectangleCollision(ball.posX + ball.width / 4, ball.posY, ball.width / 2, ball.height / 4, this._bricks[i].posX, this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height, true)) {
                    collision = true;
                    velocityX = ball.velocityX;
                    velocityY = -ball.velocityY;
                }
                else if (this.rectangleCollision(ball.posX + 3 * ball.width / 4, ball.posY + ball.height / 4, ball.width / 4, ball.height / 2, this._bricks[i].posX, this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height, true)) {
                    collision = true;
                    velocityX = -ball.velocityX;
                    velocityY = ball.velocityY;
                }
                else if (this.rectangleCollision(ball.posX + ball.width / 4, ball.posY + 4 * ball.height / 4, ball.width / 2, ball.height / 4, this._bricks[i].posX, this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height, true)) {
                    collision = true;
                    velocityX = ball.velocityX;
                    velocityY = -ball.velocityY;
                }
                else if (this.rectangleCollision(ball.posX, ball.posY + ball.height / 4, ball.width / 4, ball.height / 2, this._bricks[i].posX, this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height, true)) {
                    collision = true;
                    velocityX = -ball.velocityX;
                    velocityY = ball.velocityY;
                }
                if (collision) {
                    var blockDestroyed = this._bricks[i].dealDamage();
                    if (blockDestroyed) {
                        if (this._bricks[i].powerBrick) {
                            var newPowerUp = new PowerUp_1.PowerUp(this._bricks[i].posX + this._bricks[i].width / 2, this._bricks[i].posY + this._bricks[i].height, this._bricks[i].powerBrick);
                            this.powerUps.push(newPowerUp);
                            this.addChild(newPowerUp);
                        }
                        this.removeChild(this._bricks[i]);
                        this._bricks.splice(i, 1);
                        if (this._bricks.length <= 0) {
                            this.emit(Level.EVENT_NEXT_LEVEL);
                        }
                    }
                    createjs.Sound.play(Game_1.Game.AUDIO_SOURCE_COLLISION);
                    this.emit(Level.EVENT_COLLISION, velocityX, velocityY, blockDestroyed);
                    break;
                }
            }
            if (this.rectangleCollision(ball.posX, ball.posY, ball.width, ball.height, rocket.posX, rocket.posY, rocket.width, rocket.height, false)) {
                var velocity = this.calculateVelocity(ball.posX, ball.width / 2, rocket.posX, rocket.width);
                createjs.Sound.play(Game_1.Game.AUDIO_SOURCE_PONG);
                if (Math.random() * 100 > 85) {
                    var newEnemy = new Enemy_1.Enemy(Game_1.Game.WIDTH / 2, 50);
                    this.enemies.push(newEnemy);
                    this.addChild(newEnemy);
                }
                this.emit(Level.EVENT_COLLISION, velocity[0], velocity[1] * ball.velocityY, false);
            }
            for (var i = 0; i < this.powerUps.length; i++) {
                if (this.rectangleCollision(this.powerUps[i].posX, this.powerUps[i].posY, this.powerUps[i].width, this.powerUps[i].height, rocket.posX, rocket.posY, rocket.width, rocket.height, true)) {
                    this.powerUps[i].active = false;
                    this.emit(Level.EVENT_POWER_UP, this.powerUps[i].power);
                    this.removeChild(this.powerUps[i]);
                    this.powerUps.splice(i, 1);
                }
                else if (this.powerUps[i].posY > Game_1.Game.HEIGHT) {
                    this.powerUps[i].active = false;
                    this.removeChild(this.powerUps[i]);
                    this.powerUps.splice(i, 1);
                }
            }
            for (var i = 0; i < this.enemies.length; i++) {
                if (this.rectangleCollision(this.enemies[i].posX, this.enemies[i].posY, this.enemies[i].width, this.enemies[i].height, rocket.posX, rocket.posY, rocket.width, rocket.height, true)) {
                    createjs.Sound.play(Game_1.Game.AUDIO_SOURCE_ENEMY);
                    ball.emit(Level.EVENT_BALL_OUT);
                    this.enemies[i].active = false;
                    this.removeChild(this.enemies[i]);
                    this.enemies.splice(i, 1);
                }
                else if (this.rectangleCollision(this.enemies[i].posX, this.enemies[i].posY, this.enemies[i].width, this.enemies[i].height, ball.posX, ball.posY, ball.width, ball.height, true)) {
                    createjs.Sound.play(Game_1.Game.AUDIO_SOURCE_ENEMY);
                    this.enemies[i].active = false;
                    this.removeChild(this.enemies[i]);
                    this.enemies.splice(i, 1);
                }
                else if (this.enemies[i].posY > Game_1.Game.HEIGHT) {
                    this.enemies[i].active = false;
                    this.removeChild(this.enemies[i]);
                    this.enemies.splice(i, 1);
                }
            }
        };
        Level.prototype.calculateVelocity = function (ballX, ballR, rectX, rectWidth) {
            var sideHit = ballX - 1 >= rectX + rectWidth || ballX + ballR * 2 + 1 <= rectX;
            if (ballX + ballR <= rectX + rectWidth / 5) {
                if (sideHit)
                    return [-1, 1];
                else
                    return [-1, -1];
            }
            else if (ballX + ballR <= rectX + 2 * rectWidth / 5) {
                return [-0.5, -1];
            }
            else if (ballX + ballR <= rectX + 3 * rectWidth / 5) {
                return [Math.random() * 0.2 - 0.1, -1];
            }
            else if (ballX + ballR <= rectX + 3 * rectWidth / 5) {
                return [0.5, -1];
            }
            else {
                if (sideHit)
                    return [1, 1];
                else
                    return [1, -1];
            }
        };
        // Params >>------------------------------------------------------------<<<<
        Level.EVENT_COLLISION = 'Collision';
        Level.EVENT_POWER_UP = 'PowerUp';
        Level.EVENT_NEXT_LEVEL = 'NextLevel';
        Level.EVENT_BALL_OUT = 'BallOut';
        return Level;
    }(Container));
    exports.Level = Level;
});
//# sourceMappingURL=Level.js.map