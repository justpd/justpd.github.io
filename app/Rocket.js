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
    var Texture = PIXI.Texture;
    var Rocket = (function (_super) {
        __extends(Rocket, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Rocket() {
            var _this = _super.call(this) || this;
            _this.speed = 4;
            _this.velocity = 0;
            _this.posX = Game_1.Game.WIDTH / 2 - 48;
            _this.posY = Game_1.Game.HEIGHT - 32;
            _this.configurate();
            return _this;
        }
        Rocket.prototype.configurate = function () {
            this._normalRocket = Texture.fromImage('assets/images/' + Game_1.Game.IMAGE_SOURCE_ROCKET);
            this._longRocket = Texture.fromImage('assets/images/' + Game_1.Game.IMAGE_SOURCE_LONG_ROCKET);
            this._image = new Sprite(this._normalRocket);
            this._image.position.set(this.posX, this.posY);
            this.addChild(this._image);
            this._longitude = false;
        };
        Rocket.prototype.reset = function () {
            this._longitude = false;
            this._image.texture = this._normalRocket;
            this.posX += 18;
            this.posX = Game_1.Game.WIDTH / 2 - 48;
            this._image.position.set(this.posX, this.posY);
        };
        Rocket.prototype.move = function () {
            this.posX += this.velocity * this.speed;
            if (this.posX <= 32) {
                this.posX = 32;
            }
            if (this.posX >= Game_1.Game.WIDTH - this.width - 32) {
                this.posX = Game_1.Game.WIDTH - this.width - 32;
            }
            this._image.position.set(this.posX, this.posY);
        };
        Rocket.prototype.powerUp = function (type) {
            switch (type) {
                case 'LongRocket':
                    this.posX -= 18;
                    this._image.texture = this._longRocket;
                    this._longitude = true;
                    setTimeout(function () {
                        if (this._longitude) {
                            this._image.texture = this._normalRocket;
                            this.posX += 18;
                            this._longitude = false;
                        }
                    }.bind(this), 15000);
                    break;
            }
        };
        return Rocket;
    }(Container));
    exports.Rocket = Rocket;
});
//# sourceMappingURL=Rocket.js.map