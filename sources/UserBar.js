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
var TextStyle = PIXI.TextStyle;
var Game_1 = require("./Game");
var UserBar = (function (_super) {
    __extends(UserBar, _super);
    // Init >>--------------------------------------------------------------<<<<
    /**
     * @private
     */
    function UserBar() {
        var _this = _super.call(this) || this;
        _this.configurate();
        return _this;
    }
    UserBar.prototype.configurate = function () {
        var style = new TextStyle({ fill: '#ffffff', fontSize: 28, fontWeight: '600', dropShadow: true, align: 'center' });
        this.score = new PIXI.Text('Score: 0');
        this.lives = new PIXI.Text('Lives: 0');
        this.stage = new PIXI.Text('Stage: 0');
        this.message = new PIXI.Text('Press Space to continue !');
        this.score.position.set(5, 10);
        this.lives.anchor.set(1, 0);
        this.lives.position.set(Game_1.Game.WIDTH - 5, 10);
        this.stage.anchor.set(0.5);
        this.stage.position.set(Game_1.Game.WIDTH / 2, 68);
        this.message.anchor.set(0.5);
        this.message.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT / 2);
        this.lives.style = style;
        this.score.style = style;
        this.stage.style = new TextStyle({ fill: '#ffffff', fontSize: 18, fontWeight: '600', dropShadow: false, align: 'center' });
        this.message.style = style;
        this.addChild(this.score);
        this.addChild(this.lives);
        this.addChild(this.stage);
        this.addChild(this.message);
    };
    return UserBar;
}(Container));
exports.UserBar = UserBar;
