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
    var Brick = (function (_super) {
        __extends(Brick, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Brick(x, y, strength) {
            var _this = _super.call(this) || this;
            _this.posX = x;
            _this.posY = y;
            _this._strength = strength;
            switch (_this._strength) {
                case 3:
                    _this.powerBrick = 'LongRocket';
                    break;
                default:
                    if (Math.random() * 100 > 96) {
                        _this.powerBrick = 'Heal';
                    }
            }
            _this.configurate();
            return _this;
        }
        Brick.prototype.configurate = function () {
            this._image = new Sprite();
            this._image.position.set(this.posX, this.posY);
            this.setImage();
            this.addChild(this._image);
        };
        Brick.prototype.setImage = function () {
            this._image.texture = Texture.fromImage('assets/images/' + this._strength + '_' + Game_1.Game.IMAGE_SOURCE_BRICKS);
        };
        Brick.prototype.dealDamage = function () {
            this._strength -= 1;
            return this._strength <= 0;
        };
        return Brick;
    }(Container));
    exports.Brick = Brick;
});
//# sourceMappingURL=Brick.js.map