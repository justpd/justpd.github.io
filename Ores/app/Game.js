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
define(["require", "exports", "./Field", "./Switcher", "./Button"], function (require, exports, Field_1, Switcher_1, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = PIXI.Sprite;
    var Text = PIXI.Text;
    var TextStyle = PIXI.TextStyle;
    var Container = PIXI.Container;
    var Sound = createjs.Sound;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game(resources) {
            var _this = _super.call(this) || this;
            _this._timeToPlay = 180;
            Game.RES = resources;
            _this._score = 0;
            _this._combo = 0;
            _this._state = Game.IDLE;
            _this.on('eventTimerStart', _this.startTimer);
            _this.on('eventComboEnd', _this.endCombo);
            _this.on('eventComboUp', _this.upCombo);
            _this._field = new Field_1.Field();
            _this._background = new Sprite(Game.RES.background.texture);
            _this._soundSwitcher = new Switcher_1.Switcher(Game.RES.soundSwitcherOn.texture, Game.RES.soundSwitcherOff.texture);
            _this._restartButton = new Button_1.MenuButton("RESTART");
            _this._scoreText = new Text(_this._score.toString());
            _this._comboText = new Text("x1");
            _this._timerText = new Text("-:--");
            _this.setUI();
            _this.setSounds();
            _this.addChild(_this._background);
            _this.addChild(_this._field);
            _this.addChild(_this._soundSwitcher);
            _this.addChild(_this._comboText);
            _this.addChild(_this._timerText);
            _this.addChild(_this._scoreText);
            _this._field.emit('eventSetField');
            return _this;
        }
        Game.prototype.setUI = function () {
            this._background.width = Game.WIDTH;
            this._background.height = Game.HEIGHT;
            this._background.alpha = 0.6;
            this._textStyle = new TextStyle({
                fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
                dropShadow: true,
                dropShadowDistance: 6,
                dropShadowBlur: 5,
            });
            this._scoreText.style = this._textStyle;
            this._scoreText.anchor.set(0.5);
            this._scoreText.position.set(Game.WIDTH / 2, 300);
            this._comboText.style = this._textStyle;
            this._comboText.anchor.set(0.5);
            this._comboText.position.set(Game.WIDTH / 2, Game.HEIGHT - 120);
            this._comboText.alpha = 0;
            this._timerText.style = this._textStyle;
            this._timerText.anchor.set(0.5);
            this._timerText.position.set(Game.WIDTH * 0.8, 150);
            this._soundSwitcher.position.set(Game.WIDTH * 0.2, 140);
            this._soundSwitcher.scale.set(0.8);
            this._restartButton.on('click', function () {
                var game = new Game(Game.RES);
                this.parent.addChild(game);
                this.destroy();
            }.bind(this));
        };
        Game.prototype.setSounds = function () {
            Sound.registerSound("./resources/assets/sounds/ambient.mp3", Game.SOUND_AMBIENT);
            Sound.registerSound("./resources/assets/sounds/select.mp3", Game.SOUND_SELECT);
            Sound.registerSound("./resources/assets/sounds/unselect.mp3", Game.SOUND_UNSELECT);
            Sound.registerSound("./resources/assets/sounds/destroy.mp3", Game.SOUND_DESTROY);
            Sound.registerSound("./resources/assets/sounds/press.mp3", Game.SOUND_PRESS);
            Sound.on("fileload", this.onSoundLoad, Game.SOUND_AMBIENT);
        };
        // Обработчик проигрывания фоновой музыки
        Game.prototype.onSoundLoad = function () {
            createjs.Sound.play(Game.SOUND_AMBIENT, createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.5);
        };
        // Старт таймера ограничения времени игры
        Game.prototype.startTimer = function () {
            this._time = this._timeToPlay;
            this._state = Game.INGAME;
            this.setTimerText();
            this._timer = new TimelineMax({ repeat: this._timeToPlay, repeatDelay: 1, onComplete: this.onTimerEnd.bind(this), onRepeat: this.onTimerTick.bind(this) });
        };
        Game.prototype.onTimerEnd = function () {
            this._time = 0;
            this.setTimerText();
            this._state = Game.GAMEOVER;
            if (this._combo == 0)
                this.endGame();
        };
        Game.prototype.endGame = function () {
            this._field.switchInteractive(false);
            this.removeChild(this._field);
            TweenMax.to(this._field, 2, { alpha: 0 });
            TweenMax.to(this._scoreText, 2, { x: Game.WIDTH / 2, y: Game.HEIGHT * 0.45 });
            TweenMax.to(this._scoreText.scale, 2, { x: 1.5, y: 1.5 });
            this.addChild(this._restartButton);
            this._restartButton.setInteractive(false);
            var tl = new TimelineMax({ onComplete: function () { this._restartButton.setInteractive(true); }.bind(this) });
            tl.fromTo(this._restartButton, 2, { x: Game.WIDTH / 2, y: Game.HEIGHT - 300, alpha: 0 }, { x: Game.WIDTH / 2, y: Game.HEIGHT * 0.55, alpha: 1 });
        };
        Game.prototype.upCombo = function () {
            if (this._combo == 0)
                TweenMax.to(this._comboText, 0.2, { alpha: 1 });
            this._combo += 1;
            this._comboText.text = "x" + this._combo.toString();
            this._score += 50 * this._combo;
            this._scoreText.text = this._score.toString();
        };
        Game.prototype.endCombo = function () {
            this._combo = 0;
            TweenMax.to(this._comboText, 0.5, { alpha: 0 });
            if (this._state == Game.GAMEOVER)
                this.endGame();
        };
        Game.prototype.onTimerTick = function () {
            this._time -= 1;
            if (this._time < 60)
                this._field.setOresCount(7);
            else if (this._time < 120)
                this._field.setOresCount(6);
            this.setTimerText();
        };
        Game.prototype.setTimerText = function () {
            var sec = this._time % 60;
            var min = (this._time - sec) / 60;
            var keyChar = (sec < 10) ? "0" : "";
            this._timerText.text = min.toString() + ":" + keyChar + sec.toString();
        };
        Game.WIDTH = 720;
        Game.HEIGHT = 1280;
        Game.IDLE = 0;
        Game.INGAME = 1;
        Game.GAMEOVER = 2;
        Game.SOUND_SELECT = "Select";
        Game.SOUND_UNSELECT = "Unselect";
        Game.SOUND_DESTROY = "Destroy";
        Game.SOUND_PRESS = "Press";
        Game.SOUND_AMBIENT = "Ambient";
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map