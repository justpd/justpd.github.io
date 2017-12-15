"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Container = PIXI.Container;
var Sprite = PIXI.Sprite;
var Game_1 = require("./Game");
var Rocket = (function (_super) {
    __extends(Rocket, _super);
    // Init >>--------------------------------------------------------------<<<<
    /**
     * @private
     */
    function Rocket() {
        var _this = _super.call(this) || this;
        _this.speed = 4;
        _this.velocity = 0;
        _this.posX = Game_1.Game.WIDTH / 2 - 48;
        _this.posY = Game_1.Game.HEIGHT - 32;
        _this.configurate();
        return _this;
    }
    Rocket.prototype.configurate = function () {
        this._image = Sprite.fromImage('assets/rocket.png');
        this._image.position.set(this.posX, this.posY);
        this.addChild(this._image);
    };
    Rocket.prototype.reset = function () {
        this.posX = Game_1.Game.WIDTH / 2 - 48;
        this._image.position.set(this.posX, this.posY);
    };
    Rocket.prototype.move = function () {
        this.posX += this.velocity * this.speed;
        if (this.posX <= 32) {
            this.posX = 32;
        }
        if (this.posX >= Game_1.Game.WIDTH - this.width - 32) {
            this.posX = Game_1.Game.WIDTH - this.width - 32;
        }
        this._image.position.set(this.posX, this.posY);
    };
    return Rocket;
}(Container));
exports.Rocket = Rocket;
