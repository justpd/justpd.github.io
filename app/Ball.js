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
define(["require", "exports", "./Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Ball = (function (_super) {
        __extends(Ball, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Ball() {
            var _this = _super.call(this) || this;
            _this.onTheRocket = true;
            _this.speed = 4;
            _this.velocityX = 0;
            _this.velocityY = 0;
            _this.posX = Math.ceil(Game_1.Game.WIDTH / 2);
            _this.posY = Game_1.Game.HEIGHT - 48;
            _this.configurate();
            return _this;
        }
        Ball.prototype.configurate = function () {
            this._image = Sprite.fromImage('assets/ball.png');
            this._image.scale.set(1);
            this._image.position.set(this.posX, this.posY);
            this.addChild(this._image);
        };
        Ball.prototype.reset = function (posX, posY) {
            this.onTheRocket = true;
            this.velocityX = 0;
            this.velocityY = 0;
            this.posX = posX;
            this.posY = posY;
            this._image.position.set(this.posX, this.posY);
        };
        Ball.prototype.move = function () {
            this.posX += this.velocityX * this.speed;
            this.posY += this.velocityY * this.speed;
            if (this.posX + this.width >= Game_1.Game.WIDTH - 32) {
                this.posX = Game_1.Game.WIDTH - this.width - 32;
                this.velocityX *= -1;
                createjs.Sound.play('collision');
            }
            else if (this.posX <= 32) {
                this.posX = 32;
                this.velocityX *= -1;
                createjs.Sound.play('collision');
            }
            else if (this.posY <= 84) {
                this.posY = 84;
                this.velocityY *= -1;
                createjs.Sound.play('collision');
            }
            else if (this.posY + this.height >= Game_1.Game.HEIGHT + 16) {
                createjs.Sound.play('ballOut');
                this.emit('BallOut');
            }
            this._image.position.set(this.posX, this.posY);
        };
        Ball.prototype.push = function () {
            this.onTheRocket = false;
            this.velocityY = -1;
            this.velocityX = Math.random() * 1.6 - 0.8;
        };
        return Ball;
    }(Container));
    exports.Ball = Ball;
});
//# sourceMappingURL=Ball.js.map