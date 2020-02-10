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
    var Sprite = PIXI.Sprite;
    var Container = PIXI.Container;
    var Switcher = /** @class */ (function (_super) {
        __extends(Switcher, _super);
        function Switcher(_norm, _switch) {
            var _this = _super.call(this) || this;
            _this.sprite = new Sprite(_norm);
            _this.sprite.anchor.set(0.5);
            _this.sprite.interactive = true;
            _this.sprite.buttonMode = true;
            _this.sprite.on("pointerover", function () {
                this.sprite.alpha = 0.75;
            }.bind(_this));
            _this.sprite.on("pointerout", function () {
                this.sprite.alpha = 1;
            }.bind(_this));
            _this.sprite.on("pointeroutside", function () {
                this.sprite.alpha = 1;
            }.bind(_this));
            _this.sprite.on("pointerdown", function () {
                this.sprite.alpha = 0.55;
            }.bind(_this));
            _this.sprite.on("pointerup", function () {
                if (this.sprite.texture == _norm) {
                    this.sprite.interactive = false;
                    this.sprite.texture = _switch;
                    createjs.Sound.setMute(true);
                    setTimeout(function () {
                        this.sprite.alpha = 1;
                        this.sprite.interactive = true;
                    }.bind(this), 50);
                }
                else {
                    this.sprite.interactive = false;
                    this.sprite.texture = _norm;
                    createjs.Sound.setMute(false);
                    setTimeout(function () {
                        this.sprite.alpha = 1;
                        this.sprite.interactive = true;
                    }.bind(this), 50);
                }
            }.bind(_this));
            _this.addChild(_this.sprite);
            return _this;
        }
        return Switcher;
    }(Container));
    exports.Switcher = Switcher;
});
//# sourceMappingURL=Switcher.js.map