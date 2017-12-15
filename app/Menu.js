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
    var Sprite = PIXI.Sprite;
    var TextStyle = PIXI.TextStyle;
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Params >>------------------------------------------------------------<<<<
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Menu() {
            var _this = _super.call(this) || this;
            _this.configurate();
            return _this;
        }
        Menu.prototype.configurate = function () {
            this.interactive = true;
            var background = Sprite.fromImage('assets/menu.png');
            var style = new TextStyle({ fill: '#ffffff', fontSize: 18, fontWeight: '600', dropShadow: true, align: 'center' });
            var menuText = new PIXI.Text('CONTROLS:\nZ - START, LEFT/RIGHT ARROWS - MOVEMENT\nDOWN ARROW - SOUND, UP ARROW - CHEAT.\n\n' +
                'MOBILE:\nZ, SOUND, CHEAT, PAUSE BUTTONS ARE ON THE PIPE\n TAP LEFT OR RIGHT (NEAR PADDLE) TO MOVE.\n\n TAP OR CLICK TO CONTINUE!');
            menuText.anchor.set(0.5);
            menuText.style = style;
            menuText.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT / 2);
            this.addChild(background);
            this.addChild(menuText);
        };
        return Menu;
    }(Container));
    exports.Menu = Menu;
});
//# sourceMappingURL=Menu.js.map