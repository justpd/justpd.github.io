var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = PIXI.Sprite;
    var Container = PIXI.Container;
    var Plate = /** @class */ (function (_super) {
        __extends(Plate, _super);
        function Plate() {
            var _this = _super.call(this) || this;
            _this.fieldTextures = [
                Game_1.Game.RES._bg_0.texture,
                Game_1.Game.RES._bg_1.texture,
                Game_1.Game.RES._bg_2.texture,
                Game_1.Game.RES._bg_3.texture,
            ];
            _this._background = new Sprite(_this.fieldTextures[Math.floor(Math.random() * 4)]);
            _this._background.scale.set(Game_1.Game.TILE / _this._background.texture.width);
            _this._background.alpha = 0.8;
            _this.addChild(_this._background);
            return _this;
        }
        return Plate;
    }(Container));
    exports.Plate = Plate;
});
//# sourceMappingURL=Plate.js.map