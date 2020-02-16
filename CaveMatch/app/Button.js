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
    var Text = PIXI.Text;
    var TextStyle = PIXI.TextStyle;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(_norm, _pressed, _text, _fonstSize, _fill, _align) {
            if (_text === void 0) { _text = ""; }
            if (_fonstSize === void 0) { _fonstSize = 18; }
            if (_fill === void 0) { _fill = "#ffffff"; }
            if (_align === void 0) { _align = "center"; }
            var _this = _super.call(this) || this;
            _this._pressedAlpha = 0.4;
            _this._sprite = new Sprite();
            _this.setAnchor(0.5, 0.5);
            _this.setInteractive(true);
            _this._sprite.buttonMode = true;
            _this._normalTexture = _norm;
            _this._pressTexture = _pressed;
            _this._text = new Text(_text);
            _this._text.anchor.set(0.5, 0.5);
            _this._text.position.set(0, _this._sprite.height / 2);
            _this._text.style = new TextStyle({
                fontSize: _fonstSize, fontFamily: "Visitor TT2 BFK", fill: _fill, align: _align, fontWeight: "400",
                dropShadow: false
            });
            _this.setShadowEffects();
            _this._sprite.on("pointerover", function () {
                this.setPressStyle();
            }.bind(_this));
            _this._sprite.on("pointerout", function () {
                if (this.alpha == 1)
                    this.setNormalStyle();
            }.bind(_this));
            _this._sprite.on("pointerdown", function () {
                this.alpha = this._pressedAlpha;
                createjs.Sound.play(Game_1.Game.SOUND_PRESS, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.5);
                this.setPressStyle();
            }.bind(_this));
            _this._sprite.on("pointerupoutside", function () {
                this.alpha = 1;
                if (this._sprite.texture == this._pressTexture)
                    this.setNormalStyle();
            }.bind(_this));
            _this._sprite.on("pointerup", function () {
                this.setNormalStyle();
                this.setInteractive(false);
                this.emit("click");
                setTimeout(function () {
                    this.alpha = 1;
                    this.setInteractive(true);
                }.bind(this), 50);
            }.bind(_this));
            _this._sprite.texture = _this._normalTexture;
            _this.addChild(_this._sprite);
            _this.addChild(_this._text);
            return _this;
        }
        Button.prototype.setAnchor = function (x, y) {
            this._sprite.anchor.set(x, y);
        };
        // Функции для кастомизирования кнопок
        Button.prototype.setNormalStyle = function () {
            this._sprite.texture = this._normalTexture;
            this._text.style.fontWeight = "400";
            this._text.style.dropShadow = false;
        };
        Button.prototype.setPressStyle = function () {
            this._sprite.texture = this._pressTexture;
            this._text.style.fontWeight = "500";
            this._text.style.dropShadow = true;
        };
        Button.prototype.setShadowEffects = function () {
            this._text.style.dropShadowDistance = 6;
            this._text.style.dropShadowBlur = 5;
        };
        Button.prototype.reset = function () {
            this.setNormalStyle();
            this.setInteractive(true);
            this.alpha = 1;
        };
        Button.prototype.setInteractive = function (value) {
            this._sprite.interactive = value;
        };
        return Button;
    }(Container));
    exports.Button = Button;
    // Особый случай класса button
    var MenuButton = /** @class */ (function (_super) {
        __extends(MenuButton, _super);
        function MenuButton(text, _fonstSize, _fill, _align) {
            if (_fonstSize === void 0) { _fonstSize = 48; }
            if (_fill === void 0) { _fill = '#00ccff'; }
            if (_align === void 0) { _align = "center"; }
            return _super.call(this, Game_1.Game.RES.menuButtonNormal.texture, Game_1.Game.RES.menuButtonPress.texture, text, _fonstSize, _fill, _align) || this;
        }
        return MenuButton;
    }(Button));
    exports.MenuButton = MenuButton;
});
//# sourceMappingURL=Button.js.map