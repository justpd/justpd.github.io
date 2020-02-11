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
define(["require", "exports", "./Game", "./Tile"], function (require, exports, Game_1, Tile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Field = /** @class */ (function (_super) {
        __extends(Field, _super);
        function Field() {
            var _this = _super.call(this) || this;
            _this._oresCount = 5;
            _this.on('eventSetField', _this.generateField);
            return _this;
        }
        Field.prototype.setOresCount = function (value) {
            this._oresCount = value;
        };
        Field.prototype.getSelectedTile = function () {
            return this._selectedTile;
        };
        Field.prototype.setSelectedTile = function (value) {
            this._selectedTile = value;
        };
        Field.prototype.startGame = function () {
            this.parent.emit("eventTimerStart");
            this.animateDestroy(this.findMatches());
        };
        Field.prototype.checkField = function () {
            this.animateDestroy(this.findMatches());
        };
        // Унтичтожение игрового поля
        Field.prototype.destroyField = function () {
            if (this._tiles == null)
                return;
            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    this._tiles[i][j].destroy();
                }
            }
        };
        // Генерация игрового поля заполненного тайлами
        Field.prototype.generateField = function () {
            if (this._tiles != null) {
                this.destroyField();
                this._tiles = null;
            }
            this._tiles = new Array(8);
            var tileSize = 75;
            var paddingX = (Game_1.Game.WIDTH - 8 * tileSize) / 2;
            var paddingY = (Game_1.Game.HEIGHT - 8 * tileSize) / 2 + 100;
            for (var i = 0; i < 8; i++) {
                this._tiles[i] = new Array(8);
                for (var j = 0; j < 8; j++) {
                    var type = Math.floor(Math.random() * this._oresCount) + 1;
                    this._tiles[i][j] = new Tile_1.Tile(this, type, [i, j]);
                    this._tiles[i][j].position.set(paddingX + j * tileSize, paddingY + i * tileSize);
                    this.addChild(this._tiles[i][j]);
                    this._tiles[i][j].setType(type, 1.5, 8);
                }
            }
            // Блокировка шариков в полёте
            this.switchInteractive(false);
            var tl = new TimelineMax({ repeat: 1, repeatDelay: 1.7, onComplete: this.startGame.bind(this) });
        };
        // Генерация тайлов после их уничтожения
        Field.prototype.generateTiles = function () {
            for (var i = 0; i < this._tiles.length; i++) {
                for (var j = 0; j < this._tiles[i].length; j++) {
                    if (this._tiles[i][j].type == 0)
                        this._tiles[i][j].setType(Math.floor(Math.random() * this._oresCount) + 1, 0.5, 2);
                }
            }
            var tl = new TimelineMax({ repeat: 1, repeatDelay: 0.5, onComplete: this.checkField.bind(this) });
        };
        // Переключатель воздействия на элементы пользователем
        Field.prototype.switchInteractive = function (interactive) {
            for (var i = 0; i < this._tiles.length; i++) {
                for (var j = 0; j < this._tiles[i].length; j++) {
                    this._tiles[i][j].switchInteractive(interactive);
                }
            }
        };
        // Подсветка соседнего тайла, елси онн образует новую комбинацию
        Field.prototype.createsNewMatch = function (s, n) {
            var temp = n.type;
            var currentMatches = this.findMatches().length;
            n.type = s.type;
            s.type = temp;
            var newMatches = this.findMatches().length;
            s.type = n.type;
            n.type = temp;
            if (newMatches > currentMatches)
                return true;
            return false;
        };
        // Подсветка клеток на которые возможно походить
        Field.prototype.highlightNeighbours = function (a) {
            // Верхний равен верхнему тайлу от текущего и проверки строки над вернхим тайлом, либо null
            var upper = this._tiles[a.pos.x - 1] && this._tiles[a.pos.x - 1][a.pos.y];
            var right = this._tiles[a.pos.x] && this._tiles[a.pos.x][a.pos.y + 1];
            var bottom = this._tiles[a.pos.x + 1] && this._tiles[a.pos.x + 1][a.pos.y];
            var left = this._tiles[a.pos.x] && this._tiles[a.pos.x][a.pos.y - 1];
            if (upper && this.createsNewMatch(a, upper))
                upper.highlight();
            if (right && this.createsNewMatch(a, right))
                right.highlight();
            if (bottom && this.createsNewMatch(a, bottom))
                bottom.highlight();
            if (left && this.createsNewMatch(a, left))
                left.highlight();
        };
        //  Отключение подсветки клеток на которые возможно походить
        Field.prototype.unHighlightNeighbours = function (a) {
            // Верхний равен верхнему тайлу от текущего и проверки строки над вернхим тайлом, либо null
            var upper = this._tiles[a.pos.x - 1] && this._tiles[a.pos.x - 1][a.pos.y];
            var right = this._tiles[a.pos.x] && this._tiles[a.pos.x][a.pos.y + 1];
            var bottom = this._tiles[a.pos.x + 1] && this._tiles[a.pos.x + 1][a.pos.y];
            var left = this._tiles[a.pos.x] && this._tiles[a.pos.x][a.pos.y - 1];
            if (upper && upper.highlighted)
                upper.unHighlight();
            if (right && right.highlighted)
                right.unHighlight();
            if (bottom && bottom.highlighted)
                bottom.unHighlight();
            if (left && left.highlighted)
                left.unHighlight();
        };
        // Гравитация или генерация шариков
        Field.prototype.dropTiles = function () {
            var shiftsCounter = this.dropLine();
            var tl = new TimelineMax({ repeat: 1, repeatDelay: 0.225, onComplete: this.checkLineDrop.bind(this, shiftsCounter) });
        };
        Field.prototype.checkLineDrop = function (shiftsCounter) {
            if (shiftsCounter > 0)
                this.dropTiles();
            else
                this.generateTiles();
        };
        // Сдвиг шариков, если над пустой клеткой есть шарик
        Field.prototype.dropLine = function () {
            var shiftsCounter = 0;
            for (var j = 0; j < this._tiles.length; j++) {
                for (var i = this._tiles[j].length - 1; i >= 0; i--) {
                    if (this._tiles[i][j].type == 0) {
                        if (this._tiles[i - 1]) {
                            if (this._tiles[i - 1][j].type != 0)
                                shiftsCounter += 1;
                            this._tiles[i][j].setType(this._tiles[i - 1][j].type, 0.2);
                            this._tiles[i - 1][j].setType(0);
                        }
                    }
                }
            }
            return shiftsCounter;
        };
        // Удаление совпадений
        Field.prototype.destroyMatches = function (matches) {
            for (var i = 0; i < matches.length; i++) {
                for (var j = 0; j < matches[i].length; j++) {
                    var t = matches[i][j];
                    this.parent.emit('eventComboUp');
                    this._tiles[t.pos.x][t.pos.y].setType(0);
                }
            }
            var tl = new TimelineMax({ repeat: 1, repeatDelay: 0.25, onComplete: this.dropTiles.bind(this) });
        };
        // Анимация удаления совпадений
        Field.prototype.animateDestroy = function (matches) {
            if (matches.length > 0) {
                this.switchInteractive(false);
                for (var i = 0; i < matches.length; i++) {
                    for (var j = 0; j < matches[i].length; j++) {
                        TweenMax.to(matches[i][j].item, 0.4, { alpha: 0, rotation: 2.5 });
                        TweenMax.to(matches[i][j].item.scale, 0.4, { x: 0, y: 0 });
                    }
                }
                createjs.Sound.play(Game_1.Game.SOUND_DESTROY, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 1);
                var tl = new TimelineMax({ repeat: 1, repeatDelay: 0.425, onComplete: this.destroyMatches.bind(this, matches) });
            }
            else {
                this.parent.emit('eventComboEnd');
                this.switchInteractive(true);
            }
        };
        // Поиск возможных совпадений по горизонтали и цвертикали
        Field.prototype.findMatches = function () {
            var v_matches = new Array();
            var h_matches = new Array();
            var v_temp;
            var h_temp;
            var matches = new Array();
            for (var i = 0; i < this._tiles.length; i++) {
                for (var j = 1; j < this._tiles[i].length; j++) {
                    if (this._tiles[i][j].type == this._tiles[i][j - 1].type && this._tiles[i][j].type != 0) {
                        if (h_temp == null) {
                            h_temp = new Array();
                            h_temp.push(this._tiles[i][j]);
                            h_temp.push(this._tiles[i][j - 1]);
                        }
                        else {
                            h_temp.push(this._tiles[i][j]);
                        }
                    }
                    else {
                        if (h_temp != null) {
                            if (h_temp.length > 2)
                                h_matches.push(h_temp);
                            h_temp = null;
                        }
                    }
                }
                if (h_temp != null) {
                    if (h_temp.length > 2)
                        h_matches.push(h_temp);
                    h_temp = null;
                }
            }
            for (var j = 0; j < this._tiles.length; j++) {
                for (var i = 1; i < this._tiles[j].length; i++) {
                    if (this._tiles[i][j].type == this._tiles[i - 1][j].type && this._tiles[i][j].type != 0) {
                        if (v_temp == null) {
                            v_temp = new Array();
                            v_temp.push(this._tiles[i][j]);
                            v_temp.push(this._tiles[i - 1][j]);
                        }
                        else {
                            v_temp.push(this._tiles[i][j]);
                        }
                    }
                    else {
                        if (v_temp != null) {
                            if (v_temp.length > 2)
                                v_matches.push(v_temp);
                            v_temp = null;
                        }
                    }
                }
                if (v_temp != null) {
                    if (v_temp.length > 2)
                        v_matches.push(v_temp);
                    v_temp = null;
                }
            }
            if (v_matches.length > 0) {
                for (var i = 0; i < v_matches.length; i++) {
                    matches.push(v_matches[i]);
                }
            }
            if (h_matches.length > 0) {
                for (var i = 0; i < h_matches.length; i++) {
                    matches.push(h_matches[i]);
                }
            }
            return (matches);
        };
        return Field;
    }(Container));
    exports.Field = Field;
});
//# sourceMappingURL=Field.js.map