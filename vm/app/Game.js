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
define(["require", "exports", "./Button"], function (require, exports, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author Кожанов Н.К.
     * @version 1.0
     * @since 11 Октябрь 2018
     */
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
            _this._a = 1; // Need to read
            _this._b = 5; // Need to read
            _this._eps = 0.1; // Need to read
            _this._n = 10;
            _this._calculateButton = new Button_1.Button(Game.EVENT_CALCULATE, "Calculate", 100, 0.5, 0.5);
            _this._calculateButton.on(Game.EVENT_CALCULATE, _this.calculate, _this);
            _this._calculateButton.position.set(Game.WIDTH / 2, 600);
            _this._aButton = new Button_1.Button(Game.EVENT_INPUT_A, "Calculate", 100, 0.5, 0.5);
            _this._aButton.on(Game.EVENT_INPUT_A, _this.setAciveA, _this);
            _this._aButton.position.set(Game.WIDTH / 2, 100);
            _this._bButton = new Button_1.Button(Game.EVENT_INPUT_B, "Calculate", 100, 0.5, 0.5);
            _this._bButton.on(Game.EVENT_INPUT_B, _this.setAciveB, _this);
            _this._bButton.position.set(Game.WIDTH / 2, 200);
            _this._epsButton = new Button_1.Button(Game.EVENT_INPUT_EPS, "Calculate", 100, 0.5, 0.5);
            _this._epsButton.on(Game.EVENT_INPUT_EPS, _this.setAciveEps, _this);
            _this._epsButton.position.set(Game.WIDTH / 2, 300);
            _this._a_text = new PIXI.Text("Введите А", {
                fontFamily: "Arial",
                fontSize: 32,
                fill: 0xffffff,
                align: "center",
            });
            _this._b_text = new PIXI.Text("Введите B", {
                fontFamily: "Arial",
                fontSize: 32,
                fill: 0xffffff,
                align: "center",
            });
            _this._eps_text = new PIXI.Text("Введите Eps", {
                fontFamily: "Arial",
                fontSize: 32,
                fill: 0xffffff,
                align: "center",
            });
            _this._result_text = new PIXI.Text("", {
                fontFamily: "Arial",
                fontSize: 32,
                fill: 0xffffff,
                align: "center",
            });
            _this._a_text.x = Game.WIDTH / 2;
            _this._a_text.y = 100;
            _this._a_text.anchor.set(0.5);
            _this._b_text.x = Game.WIDTH / 2;
            _this._b_text.y = 200;
            _this._b_text.anchor.set(0.5);
            _this._eps_text.x = Game.WIDTH / 2;
            _this._eps_text.y = 300;
            _this._eps_text.anchor.set(0.5);
            _this._result_text.x = Game.WIDTH / 2;
            _this._result_text.y = 450;
            _this._result_text.anchor.set(0.5);
            _this.configurate();
            return _this;
        }
        Game.prototype.configurate = function () {
            var bg = Sprite.fromImage("assets/bg.png");
            var inputBg = Sprite.fromImage("assets/input.png");
            bg.width = Game.WIDTH;
            bg.height = Game.HEIGHT;
            var text = new PIXI.Text("Calculate", {
                fontFamily: "Arial",
                fontSize: 32,
                fill: 0xffffff,
                align: "center",
            });
            text.anchor.set(0.5);
            this.addChild(bg);
            this.addChild(this._aButton);
            this.addChild(this._bButton);
            this.addChild(this._epsButton);
            this.addChild(this._a_text);
            this.addChild(this._b_text);
            this.addChild(this._eps_text);
            this.addChild(this._result_text);
            this.addChild(this._calculateButton);
            this.addChild(text);
            text.x = Game.WIDTH / 2;
            text.y = 600;
        };
        Game.prototype.setAciveA = function () {
            this._activeInput = this._a_text;
            this._activeInput.text = "";
        };
        Game.prototype.setAciveB = function () {
            this._activeInput = this._b_text;
            this._activeInput.text = "";
        };
        Game.prototype.setAciveEps = function () {
            this._activeInput = this._eps_text;
            this._activeInput.text = "";
        };
        Game.prototype.calculate = function () {
            this._a = +this._a_text.text;
            this._b = +this._b_text.text;
            this._eps = +this._eps_text.text;
            console.log(this._a);
            console.log(this._b);
            console.log(this._eps);
            this._s2 = this.getIntegral(this._x, this._a, this._b, this._n);
            this._n *= 2;
            this._s1 = this.getIntegral(this._x, this._a, this._b, this._n);
            this._temp = 10;
            while (Math.abs(this._s1 - this._s2) > this._eps) {
                this._s1 = this._s2;
                this._n *= 2;
                this._s2 = this.getIntegral(this._x, this._a, this._b, this._n);
                console.log(Math.abs(this._s1 - this._s2));
                if (Math.abs(this._s1 - this._s2) > this._temp) {
                    this._result_text.text = "Точность не достижима.";
                    return;
                }
                this._temp = Math.abs(this._s1 - this._s2);
            }
            console.log("Интеграл : " + this._s2);
            this._result_text.text = "" + this._s2;
        };
        Game.prototype.getIntegral = function (x, a, b, n) {
            var h = 0;
            var sum = 0;
            h = (b - a) / n;
            x = a + h;
            for (var i = 0; i < n; i++) {
                sum += this.func(x);
                x = x + h;
            }
            return (sum * h);
        };
        Game.prototype.func = function (x) {
            return x * x;
        };
        // Base >>--------------------------------------------------------------<<<<
        // Events >>------------------------------------------------------------<<<<
        Game.prototype.eventKeyboardInput = function (event) {
            if (event.keyCode >= 48 && event.keyCode <= 57 && event.type == "keydown") {
                this._activeInput.text += (event.keyCode - 48).toString();
            }
            if (event.keyCode == 8 && event.type == "keydown") {
                this._activeInput.text = this._activeInput.text.slice(0, -1);
            }
            if (event.keyCode == 190 && event.type == "keydown") {
                this._activeInput.text += ".";
            }
        };
        // Params >>------------------------------------------------------------<<<<
        Game.WIDTH = 1280;
        Game.HEIGHT = 720;
        Game.EVENT_CALCULATE = "Event_Calculate";
        Game.EVENT_INPUT_A = "Input_a";
        Game.EVENT_INPUT_B = "Input_b";
        Game.EVENT_INPUT_EPS = "Input_eps";
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map