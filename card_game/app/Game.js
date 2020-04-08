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
define(["require", "exports", "./NetworkProvider"], function (require, exports, NetworkProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = PIXI.Sprite;
    var Text = PIXI.Text;
    var TextStyle = PIXI.TextStyle;
    var Container = PIXI.Container;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        // ==== Init ============================================= //
        /**
         * @private
         * @param resources - loader resources
         */
        function Game(resources) {
            var _this = _super.call(this) || this;
            Game.RES = resources;
            _this._networkProvider = new NetworkProvider_1.NetworkProvider();
            _this._networkProvider.on(NetworkProvider_1.NetworkProvider.EVENT_CONNECTED, _this.eventConnected, _this);
            _this._networkProvider.on(NetworkProvider_1.NetworkProvider.EVENT_DISCONNECTED, _this.eventDisconnected, _this);
            _this._networkProvider.on(NetworkProvider_1.NetworkProvider.EVENT_DATA, _this.eventData, _this);
            _this.configurator();
            _this.openConnection();
            return _this;
        }
        // ==== Base ============================================= //
        Game.prototype.configurator = function () {
            // ==== Initing Childs ============================================= //
            this._background = new Sprite(Game.RES._background.texture);
            this._testText = new Text("100");
            // ==== Configuring Childs =========================================== //
            this._background.width = Game.WIDTH;
            this._background.height = Game.HEIGHT;
            this._background.alpha = 0.6;
            this._textStyle = new TextStyle({
                fontSize: 80, fontFamily: "Visitor TT2 BFK", fill: '#ffffff', align: "center", fontWeight: "600",
                dropShadow: true,
                dropShadowDistance: 6,
                dropShadowBlur: 5,
            });
            this._testText.style = this._textStyle;
            this._testText.anchor.set(0.5);
            this._testText.position.set(Game.WIDTH * 0.5, Game.HEIGHT * 0.5);
            // ==== Adding Childs ================================================ //
            this.addChild(this._background);
            this.addChild(this._testText);
        };
        Game.prototype.openConnection = function () {
            console.log('Game >>> Trying to connect with Server: 62.68.128.229:9090.');
            this._networkProvider.openConnection('ws://62.68.128.229:9090/ws');
        };
        // ==== Events ================================================ //
        Game.prototype.eventConnected = function () {
            console.log('Game >>> Server connection succes.');
        };
        Game.prototype.eventDisconnected = function () {
            console.log('Game >>> Server connection closed.');
        };
        Game.prototype.eventData = function (event) {
            var _this = this;
            console.log('Game >>> Data from server.');
            console.log(event);
            var _class = event.CLASS_NAME;
            var classSwitcher = function (_class) { return ({
                "SERVER LOG": _this.dataOnServerLog(event),
            }); };
            classSwitcher(_class);
        };
        // ==== Data Classes ================================================ //
        Game.prototype.dataOnServerLog = function (event) {
            this._testText.text = event.DATA;
        };
        Game.WIDTH = 1600;
        Game.HEIGHT = 900;
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map