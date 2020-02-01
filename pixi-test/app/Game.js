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
define(["require", "exports", "./Menu"], function (require, exports, Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Ticker = PIXI.Ticker;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        /**
         * @private
         */
        function Game(resources) {
            var _this = _super.call(this) || this;
            _this._x = 0;
            Game.RESOURCES = resources;
            _this.UI_back = new Sprite(Game.RESOURCES.stageBackground.texture);
            _this.SC_Menu = new Menu_1.Menu();
            console.log(_this.UI_back.width);
            _this._ticker = Ticker.shared;
            _this._ticker.add(_this.Update, _this);
            _this._ticker.deltaTime = 100;
            _this._ticker.start();
            _this.addChild(_this.UI_back);
            _this.addChild(_this.SC_Menu);
            return _this;
        }
        Game.prototype.eventKeyboardInput = function (event) {
            // if (event.keyCode == 83 && event.type == 'keydown') {
            //     this.removeChild(this._image);
            // }
            // else if (event.keyCode == 87 && event.type == 'keydown') {
            //     this.addChild(this._image);
            // }
        };
        Game.prototype.Update = function () {
            this.SC_Menu.Animate();
        };
        // Params >>------------------------------------------------------------<<<<
        Game.WIDTH = 1024;
        Game.HEIGHT = 1024;
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map