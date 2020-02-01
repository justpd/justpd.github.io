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
    var Text = PIXI.Text;
    var TextStyle = PIXI.TextStyle;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(event, texture, text, anchorX, anchorY, timeToWork, auto) {
            if (timeToWork === void 0) { timeToWork = 100; }
            if (auto === void 0) { auto = true; }
            var _this = _super.call(this) || this;
            _this._event = event;
            _this._sprite = new Sprite(texture);
            _this._timeToWork = timeToWork;
            _this._anchor = [anchorX, anchorY];
            _this._auto = auto;
            _this._text = new Text(text);
            _this.configure();
            return _this;
        }
        Button.prototype.configure = function () {
            this._sprite.interactive = true;
            this._sprite.buttonMode = true;
            this._sprite.anchor.set(this._anchor[0], this._anchor[1]);
            this._sprite.on('pointerup', function () {
                this.emit(this._event);
                this._sprite.alpha = 0.5;
                this._text.alpha = 0.5;
                this._sprite.interactive = false;
                if (this._auto) {
                    setTimeout(function () {
                        this._sprite.alpha = 0.8;
                        this._text.alpha = 0.8;
                        this._sprite.interactive = true;
                    }.bind(this), this._timeToWork);
                }
            }.bind(this), this);
            this._sprite.on('pointerdown', function () {
                this._sprite.alpha = 0.5;
                this._text.alpha = 0.5;
            }.bind(this));
            this._sprite.on('pointerupoutside', function () {
                this._sprite.alpha = 1;
                this._text.alpha = 1;
            }.bind(this));
            this._sprite.on('mouseout', function () {
                this._sprite.alpha = 1;
                this._text.alpha = 1;
            }.bind(this));
            this._sprite.on('mouseover', function () {
                this._sprite.alpha = 0.8;
                this._text.alpha = 0.8;
            }.bind(this));
            var style = new TextStyle({ fontFamily: "MKX", fill: ['#e3ad45', '#efd85a'], fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_VERTICAL, fontSize: 48, dropShadow: true, align: 'center' });
            this._text.anchor.set(0.5);
            this._text.style = style;
            this._text.position.set(0, this._sprite.height / 2 + 5);
            this.addChild(this._sprite);
            this.addChild(this._text);
        };
        Button.prototype.show = function () {
            this.visible = true;
        };
        Button.prototype.hide = function () {
            this.visible = false;
        };
        Button.prototype.reset = function () {
            this._sprite.alpha = 1;
            this._sprite.interactive = true;
        };
        return Button;
    }(Container));
    exports.Button = Button;
});
//# sourceMappingURL=Button.js.map