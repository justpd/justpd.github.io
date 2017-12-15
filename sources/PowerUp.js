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
var PowerUp = (function (_super) {
    __extends(PowerUp, _super);
    // Init >>--------------------------------------------------------------<<<<
    /**
     * @private
     */
    function PowerUp() {
        var _this = _super.call(this) || this;
        _this.speed = 4;
        _this.posX = Math.ceil(Game_1.Game.WIDTH / 2);
        _this.posY = 48;
        _this.configurate();
        return _this;
    }
    PowerUp.prototype.configurate = function () {
        this._image = Sprite.fromImage('assets/ball.png');
        this._image.position.set(this.posX, this.posY);
        this.addChild(this._image);
    };
    PowerUp.prototype.move = function () {
        this.posY += this.speed;
        this._image.position.set(this.posX, this.posY);
    };
    return PowerUp;
}(Container));
exports.PowerUp = PowerUp;
