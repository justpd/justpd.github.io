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
    var IDLE = 0;
    var SELECTED = 1;
    var Tile = /** @class */ (function (_super) {
        __extends(Tile, _super);
        function Tile(field, _plate, pos) {
            var _this = _super.call(this) || this;
            _this._itemTextures = [
                null,
                Game_1.Game.RES._red.texture,
                Game_1.Game.RES._orange.texture,
                Game_1.Game.RES._green.texture,
                Game_1.Game.RES._blue.texture,
                Game_1.Game.RES._pink.texture,
                Game_1.Game.RES._bomb.texture,
            ];
            _this._selectedTextures = [
                null,
                Game_1.Game.RES.s_red.texture,
                Game_1.Game.RES.s_orange.texture,
                Game_1.Game.RES.s_green.texture,
                Game_1.Game.RES.s_blue.texture,
                Game_1.Game.RES.s_pink.texture,
                Game_1.Game.RES.s_bomb.texture,
            ];
            _this.pressedAlpha = 0.4;
            _this.isOver = true;
            _this.isDown = false;
            _this.pos = {
                "x": 0,
                "y": 0
            };
            _this.pos.x = pos[0];
            _this.pos.y = pos[1];
            _this.counted = false;
            _this.value = 50;
            _this._field = field;
            _this._points = new Text();
            _this._points.style = new TextStyle({
                fontSize: 60, fontFamily: "Visitor TT2 BFK", fill: '#ffffff', align: "center", fontWeight: "600",
                dropShadow: true,
                dropShadowDistance: 6,
                dropShadowBlur: 5,
            });
            _this._points.anchor.set(0.5);
            _this._points.position.set(Game_1.Game.TILE / 2 + 4, Game_1.Game.TILE / 2 + 4);
            _this.setState(IDLE);
            return _this;
        }
        Tile.prototype.setState = function (state) {
            this._state = state;
        };
        Tile.prototype.setUp = function (t, fall, mult) {
            if (fall === void 0) { fall = 0; }
            if (mult === void 0) { mult = 1; }
            this.item = new Sprite();
            this.item.scale.set(1);
            this.item.anchor.set(0.5);
            this.item.position.set(Game_1.Game.TILE / 2, Game_1.Game.TILE / 2);
            this.item.interactive = true;
            this.item.buttonMode = true;
            this.item.on("pointerover", function () {
                if (this._state == IDLE) {
                    this.item.alpha = 0.75;
                }
            }.bind(this));
            this.item.on("pointerout", function () {
                if (this._state == IDLE) {
                    this.item.alpha = 1;
                }
            }.bind(this));
            this.item.on("pointerdown", function () {
                if (this._state == IDLE) {
                    this.select();
                }
                else {
                    if (this._state == SELECTED) {
                        this.deselect();
                    }
                }
            }.bind(this));
            this.item.on("pointerupoutside", function () {
                if (this._state == SELECTED) {
                    this.deselect();
                }
            }.bind(this));
            this.addChild(this.item);
            this.addChild(this._points);
            this._points.alpha = 0;
            this.setType(t, fall, mult);
        };
        // Выбор шарика
        Tile.prototype.select = function () {
            if (this._field.getSelectedTile() == null) {
                this._field.setSelectedTile(this);
                this._field.highlightNeighbours(this);
                this.setState(SELECTED);
                // TweenMax.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: this.pressedAlpha });
                this.item.texture = this._selectedTextures[this.type];
                this.item.alpha = 1;
                createjs.Sound.play(Game_1.Game.SOUND_SELECT, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
            }
            else {
                this.swap();
            }
        };
        // Отмена выбора шарика
        Tile.prototype.deselect = function (playSound) {
            if (playSound === void 0) { playSound = true; }
            if (this._field.getSelectedTile() == this) {
                this._field.setSelectedTile(null);
            }
            this._field.unHighlightNeighbours(this);
            this.setState(IDLE);
            // TweenMax.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: 1 });
            this.item.texture = this._itemTextures[this.type];
            if (playSound)
                createjs.Sound.play(Game_1.Game.SOUND_UNSELECT, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
        };
        // Смена позиций двух шариков между друг другом
        Tile.prototype.swap = function () {
            if (this.highlighted) {
                var selectedTile = this._field.getSelectedTile();
                this._field.switchInteractive(false);
                this._field.unHighlightNeighbours(selectedTile);
                var y1 = (selectedTile.pos.x - this.pos.x) * Game_1.Game.TILE;
                var x1 = (selectedTile.pos.y - this.pos.y) * Game_1.Game.TILE;
                selectedTile.item.alpha = 1;
                this.item.alpha = 1;
                selectedTile.item.texture = selectedTile._itemTextures[selectedTile.type];
                TweenMax.to(this.item, 0.75, { x: this.item.x + x1, y: this.item.y + y1 });
                TweenMax.to(selectedTile.item, 0.75, { x: this.item.x - x1, y: this.item.y - y1 });
                var tl = new TimelineMax({
                    repeat: 1, repeatDelay: 1, onComplete: function () {
                        var temp = this.type;
                        var selected = this._field.getSelectedTile();
                        this.setType(selected.type);
                        selected.setType(temp);
                        TweenMax.set(this.item, { x: Game_1.Game.TILE / 2, y: Game_1.Game.TILE / 2 });
                        TweenMax.set(selected.item, { x: Game_1.Game.TILE / 2, y: Game_1.Game.TILE / 2 });
                        selected.deselect(false);
                        var matches = this._field.findMatches();
                        this._field.animateDestroy(matches);
                    }.bind(this)
                });
            }
        };
        Tile.prototype.blow = function (combo) {
            TweenMax.to(this.item, 0.4, { alpha: 0, rotation: 2.5 });
            TweenMax.to(this.item.scale, 0.4, { x: 0, y: 0 });
            this.counted = true;
            this._points.text = (this.value * combo).toString();
            TweenMax.fromTo(this._points, 0.3, { alpha: 0 }, { alpha: 1 });
            TweenMax.fromTo(this._points.scale, 0.3, { x: 0, y: 0 }, { x: 1, y: 1 });
        };
        // Установка типа шарика
        Tile.prototype.setType = function (t, fall, mult, event) {
            if (fall === void 0) { fall = 0; }
            if (mult === void 0) { mult = 1; }
            if (event === void 0) { event = ""; }
            if (fall > 0) {
                var tl = new TimelineMax({ onComplete: this.onTileFall.bind(this, event) });
                tl.fromTo(this.item, fall, { y: this.item.y - Game_1.Game.TILE * mult }, { y: this.item.y });
            }
            if (t == 0 && this.counted) {
                this.counted = false;
                TweenMax.fromTo(this._points, 0.75, { alpha: 1 }, { alpha: 0 });
                TweenMax.fromTo(this._points.scale, 0.75, { x: 1, y: 1 }, { x: 0, y: 0 });
            }
            this.type = t;
            this.item.texture = this._itemTextures[this.type];
            this.item.alpha = 1;
            this.item.rotation = 0;
            this.item.scale.set(1);
        };
        Tile.prototype.onTileFall = function (event) {
            if (this.parent && event != "")
                this.parent.emit(event);
        };
        // Подсветка клетки
        Tile.prototype.highlight = function (hide) {
            this.highlighted = true;
        };
        // Отмена подсветки клетки
        Tile.prototype.unHighlight = function () {
            this.highlighted = false;
        };
        // Переключатель воздействия на элементы пользователем
        Tile.prototype.switchInteractive = function (interactive) {
            this.item.interactive = interactive;
            this.item.buttonMode = interactive;
        };
        return Tile;
    }(Container));
    exports.Tile = Tile;
});
//# sourceMappingURL=Tile.js.map