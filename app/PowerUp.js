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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var BaseTexture = PIXI.BaseTexture;
    var Texture = PIXI.Texture;
    var PowerUp = (function (_super) {
        __extends(PowerUp, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function PowerUp(x, y) {
            var _this = _super.call(this) || this;
            _this.speed = 2;
            _this.active = true;
            _this.posX = x - _this.width / 2;
            _this.posY = y;
            _this.configurate();
            return _this;
        }
        PowerUp.prototype.configurate = function () {
            this._animation = [];
            for (var i = 0; i < 18; i++) {
                this._animation.push(new PIXI.Rectangle(20 * i, 0, 20, 14));
            }
            this._image = Sprite.fromImage('assets/powerUp.png');
            this._image.position.set(this.posX, this.posY);
            this._image.texture = new Texture(BaseTexture.fromImage('assets/powerUp.png'));
            this._image.texture.frame = this._animation[0];
            this.power = 'LongRocket';
            this.addChild(this._image);
            this.animate();
        };
        PowerUp.prototype.animate = function () {
            var _loop_1 = function (i) {
                setTimeout(function () {
                    if (this.active)
                        this._image.texture.frame = this._animation[i];
                }.bind(this_1), i * 200);
            };
            var this_1 = this;
            for (var i = 1; i < 9; i++) {
                _loop_1(i);
            }
            setTimeout(function () {
                if (this.active) {
                    this.animate();
                }
            }.bind(this), 1800);
        };
        PowerUp.prototype.move = function () {
            this.posY += this.speed;
            this._image.position.set(this.posX, this.posY);
        };
        return PowerUp;
    }(Container));
    exports.PowerUp = PowerUp;
});
//# sourceMappingURL=PowerUp.js.map