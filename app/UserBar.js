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
define(["require", "exports", "./Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var TextStyle = PIXI.TextStyle;
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
            this._score = new PIXI.Text();
            this._lives = new PIXI.Text();
            this._stage = new PIXI.Text();
            this._message = new PIXI.Text();
            this._score.position.set(5, 10);
            this._lives.anchor.set(1, 0);
            this._lives.position.set(Game_1.Game.WIDTH - 5, 10);
            this._stage.anchor.set(0.5);
            this._stage.position.set(Game_1.Game.WIDTH / 2, 68);
            this._message.anchor.set(0.5);
            this._message.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT / 2);
            this._lives.style = style;
            this._score.style = style;
            this._stage.style = new TextStyle({ fill: '#ffffff', fontSize: 18, fontWeight: '600', dropShadow: false, align: 'center' });
            this._message.style = style;
            this.addChild(this._score);
            this.addChild(this._lives);
            this.addChild(this._stage);
            this.addChild(this._message);
        };
        UserBar.prototype.setUserBar = function (score, lives, stage) {
            this._score.text = UserBar.SCORE_TEXT + score;
            this._lives.text = UserBar.LIVES_TEXT + lives;
            this._stage.text = UserBar.STAGE_TEXT + stage;
        };
        UserBar.prototype.setMessage = function (text) {
            this._message.text = text;
        };
        // Params >>------------------------------------------------------------<<<<
        UserBar.SCORE_TEXT = 'SCORE: ';
        UserBar.LIVES_TEXT = 'LIVES: ';
        UserBar.STAGE_TEXT = 'STAGE: ';
        UserBar.START_TEXT = 'PRESS Z TO START';
        UserBar.PAUSE_TEXT = 'GAME PAUSED';
        return UserBar;
    }(Container));
    exports.UserBar = UserBar;
});
//# sourceMappingURL=UserBar.js.map