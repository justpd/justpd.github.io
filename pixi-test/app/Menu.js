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
define(["require", "exports", "./Game", "./Button"], function (require, exports, Game_1, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var TextStyle = PIXI.TextStyle;
    var Text = PIXI.Text;
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        // ------- UI -------
        /**
         * @private
         */
        function Menu() {
            var _this = _super.call(this) || this;
            _this.UI_TitleBack = new Sprite(Game_1.Game.RESOURCES.titleLine.texture);
            _this.UI_TextureBox = Game_1.Game.RESOURCES.buttonBox.texture;
            _this.UI_TitleText = new Text("SPHERES OF IMMORTAL");
            _this.setupUI();
            return _this;
        }
        Menu.prototype.setupUI = function () {
            this.UI_TitleBack.anchor.set(0.5, 0);
            this.UI_TitleBack.x = Game_1.Game.WIDTH / 2;
            this.UI_TitleBack.y = Game_1.Game.HEIGHT * 0.157;
            this.UI_ButtonStart = new Button_1.Button('GameStart', this.UI_TextureBox, "START GAME", 0.5, 0);
            this.UI_ButtonStart.on('GameStart', this.gameStart, this);
            this.UI_ButtonStart.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT * 0.36);
            this.UI_ButtonScore = new Button_1.Button('ShowScore', this.UI_TextureBox, "HIGH SCORES", 0.5, 0);
            this.UI_ButtonScore.on('ShowScore', this.showScore, this);
            this.UI_ButtonScore.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT * 0.524);
            this.UI_ButtonSettings = new Button_1.Button('ShowSettings', this.UI_TextureBox, "SETTINGS", 0.5, 0);
            this.UI_ButtonSettings.on('ShowSettings', this.showSettings, this);
            this.UI_ButtonSettings.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT * 0.688);
            var style = new TextStyle({ fontFamily: "MKX", fill: ['#e3ad45', '#efd85a'], fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_VERTICAL, fontSize: 60, dropShadow: true, align: 'center' });
            this.UI_TitleText.anchor.set(0.5, 0);
            this.UI_TitleText.style = style;
            this.UI_TitleText.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT * 0.2);
            this.addChild(this.UI_TitleBack);
            this.addChild(this.UI_ButtonStart);
            this.addChild(this.UI_ButtonScore);
            this.addChild(this.UI_ButtonSettings);
            this.addChild(this.UI_TitleText);
        };
        Menu.prototype.gameStart = function () {
            console.log("Started");
        };
        Menu.prototype.showScore = function () {
            console.log("Score");
        };
        Menu.prototype.showSettings = function () {
            console.log("Settings");
        };
        Menu.prototype.Animate = function () {
            // let color: string = "#e3ad45".replace(/45/g, function () { return ((Math.random() * 16)).toString(16); });
            // console.log("#e3" +  + "45");
            // console.log((Math.random() * 16).toString(16));
            // this.UI_TitleText.style.fill = [color, '#ffffff'];
            // console.log('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
        };
        return Menu;
    }(Container));
    exports.Menu = Menu;
});
//# sourceMappingURL=Menu.js.map