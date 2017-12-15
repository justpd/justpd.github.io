"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Container = PIXI.Container;
var Game_1 = require("./Game");
var Brick_1 = require("./Brick");
var PowerUp_1 = require("./PowerUp");
var Level = (function (_super) {
    __extends(Level, _super);
    // Init >>--------------------------------------------------------------<<<<
    /**
     * @private
     */
    function Level() {
        var _this = _super.call(this) || this;
        _this.powerUps = [];
        _this._levelMatrix =
            [
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
            ];
        _this.configurate();
        return _this;
    }
    Level.prototype.configurate = function () {
        this.setBricks();
    };
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
    Level.prototype.setStage = function (stage) {
        switch (stage) {
            case 1:
                this._levelMatrix =
                    [
                        [],
                        [],
                        [],
                        [],
                        [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                        [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2],
                        [0, 0, 0, 2, 2, 0, 0, 3, 0, 0, 2, 2],
                        [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2],
                        [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
                    ];
                break;
            case 2:
                this._levelMatrix =
                    [
                        [],
                        [],
                        [],
                        [],
                        [0, 0, 0, 1, 1, 2, 0, 0, 2, 1, 1, 1],
                        [0, 0, 0, 1, 1, 2, 0, 0, 2, 1, 1, 1],
                        [0, 0, 0, 1, 1, 3, 0, 0, 3, 1, 1, 1],
                        [0, 0, 0, 1, 1, 2, 0, 0, 2, 1, 1, 1],
                        [0, 0, 0, 1, 1, 2, 0, 0, 2, 1, 1, 1],
                    ];
                break;
        }
        this.removeBricks();
        this.setBricks();
    };
    Level.prototype.rectangleCollision = function (x1, y1, width1, height1, x2, y2, width2, height2) {
        return y1 <= y2 + height2
            && y1 + height1 >= y2
            && x1 + width1 >= x2
            && x1 <= x2 + width2;
    };
    Level.prototype.checkCollision = function (ball, rocket) {
        var velocityX;
        var velocityY;
        for (var i = 0; i < this._bricks.length; i++) {
            var collision = void 0;
            if (this.rectangleCollision(ball.posX + ball.width / 4, ball.posY, ball.width / 2, ball.height / 4, this._bricks[i].posX, this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height)) {
                console.log('Up');
                collision = true;
                velocityX = ball.velocityX;
                velocityY = -ball.velocityY;
            }
            else if (this.rectangleCollision(ball.posX + 3 * ball.width / 4, ball.posY + ball.height / 4, ball.width / 4, ball.height / 2, this._bricks[i].posX, this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height)) {
                console.log('Right');
                collision = true;
                velocityX = -ball.velocityX;
                velocityY = ball.velocityY;
            }
            else if (this.rectangleCollision(ball.posX + ball.width / 4, ball.posY + 4 * ball.height / 4, ball.width / 2, ball.height / 4, this._bricks[i].posX, this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height)) {
                console.log('Down');
                collision = true;
                velocityX = ball.velocityX;
                velocityY = -ball.velocityY;
            }
            else if (this.rectangleCollision(ball.posX, ball.posY + ball.height / 4, ball.width / 4, ball.height / 2, this._bricks[i].posX, this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height)) {
                console.log('Left');
                collision = true;
                velocityX = -ball.velocityX;
                velocityY = ball.velocityY;
            }
            if (collision) {
                var blockDestroyed = this._bricks[i].dealDamage();
                if (blockDestroyed) {
                    if (this._bricks[i].powerBrick) {
                        var newPowerUp = new PowerUp_1.PowerUp(this._bricks[i].posX + this._bricks[i].width / 2, this._bricks[i].posY + this._bricks[i].height);
                        this.powerUps.push(newPowerUp);
                        this.addChild(newPowerUp);
                    }
                    this.removeChild(this._bricks[i]);
                    this._bricks.splice(i, 1);
                    if (this._bricks.length <= 0) {
                        this.emit('NextLevel');
                    }
                }
                createjs.Sound.play('collision');
                this.emit('Collision', velocityX, velocityY, blockDestroyed);
                break;
            }
        }
        if (ball.posY + ball.width > rocket.posY
            && ball.posY + ball.height < rocket.posY + rocket.height
            && ball.posX + ball.width > rocket.posX
            && ball.posX < rocket.posX + rocket.width) {
            var velocity = this.calculateVelocity(ball.posX, ball.posY, rocket.posX, rocket.width, rocket.posY, rocket.height);
            createjs.Sound.play('pong');
            this.emit('Collision', velocity[0], velocity[1] * ball.velocityY, false);
        }
        for (var i = 0; i < this.powerUps.length; i++) {
            if (this.rectangleCollision(this.powerUps[i].posX, this.powerUps[i].posY, this.powerUps[i].width, this.powerUps[i].height, rocket.posX, rocket.posY, rocket.width, rocket.height)) {
                this.powerUps[i].active = false;
                this.emit('PowerUp', this.powerUps[i].power);
                this.removeChild(this.powerUps[i]);
                this.powerUps.splice(i, 1);
            }
            else if (this.powerUps[i].posY > Game_1.Game.HEIGHT) {
                this.removeChild(this.powerUps[i]);
                this.powerUps.splice(i, 1);
            }
        }
    };
    Level.prototype.calculateVelocity = function (ballX, ballY, rectX, rectWidth, rectY, rectHeight) {
        var sideHit = ballY - 2 <= rectY + rectHeight && ballY >= rectY + 2;
        if (ballX <= rectX + rectWidth / 5) {
            if (sideHit)
                return [-1, 1];
            else
                return [-1, -1];
        }
        else if (ballX <= rectX + 2 * rectWidth / 5) {
            return [-0.5, -1];
        }
        else if (ballX <= rectX + 3 * rectWidth / 5) {
            return [Math.random() * 0.2 - 0.1, -1];
        }
        else if (ballX <= rectX + 3 * rectWidth / 5) {
            return [0.5, -1];
        }
        else {
            if (sideHit)
                return [1, 1];
            else
                return [1, -1];
        }
    };
    return Level;
}(Container));
exports.Level = Level;
