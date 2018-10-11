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
define(["require", "exports", "../libs/PixiTextInput"], function (require, exports, PixiTextInput_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Game() {
            var _this = _super.call(this) || this;
            _this.configurate();
            return _this;
        }
        Game.prototype.configurate = function () {
            var bg = new Sprite(PIXI.Texture.WHITE);
            bg.width = Game.WIDTH;
            bg.height = Game.HEIGHT;
            var logo = Sprite.fromImage('assets/logo.jpg');
            var inputField = PixiTextInput_1.PixiTextInput("hello");
            this.addChild(bg);
            this.addChild(logo);
            logo.x = Game.WIDTH / 2 - 425;
            logo.y = Game.HEIGHT / 2 - 192;
        };
        // Params >>------------------------------------------------------------<<<<
        Game.WIDTH = 1024;
        Game.HEIGHT = 768;
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map