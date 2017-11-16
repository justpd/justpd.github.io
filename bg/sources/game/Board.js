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
var Texture = PIXI.Texture;
var Chip_1 = require("./Chip");
var Sector_1 = require("./Sector");
var Point = PIXI.Point;
var Sound_1 = require("./Sound");
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super.call(this) || this;
        _this.bg_skin = Texture.fromImage('assets/bg.png');
        _this.bg = new Sprite(PIXI.Texture.WHITE);
        _this.dice = [3, 1];
        _this.OFFSET = 30;
        _this.countClick = 0;
        _this.tl = new TimelineLite();
        _this.sound = new Sound_1.Sound();
        // ----------Массив с фишками-------------
        _this.arrayChips = [
            [new Chip_1.Chip(false), new Chip_1.Chip(false)],
            [], [], [], [],
            [new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false)],
            [],
            [new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false)],
            [], [], [],
            [new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false)],
            [new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true)],
            [], [], [],
            [new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true)],
            [],
            [new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true)],
            [], [], [], [],
            [new Chip_1.Chip(true), new Chip_1.Chip(true)]
        ];
        // ----------Массив секторов которые отслеживают клики(на доске они скрыты)-------------
        _this.arraySectors = [new Sector_1.Sector(0), new Sector_1.Sector(1), new Sector_1.Sector(2), new Sector_1.Sector(3), new Sector_1.Sector(4), new Sector_1.Sector(5), new Sector_1.Sector(6), new Sector_1.Sector(7), new Sector_1.Sector(8), new Sector_1.Sector(9), new Sector_1.Sector(10), new Sector_1.Sector(11), new Sector_1.Sector(12),
            new Sector_1.Sector(13), new Sector_1.Sector(14), new Sector_1.Sector(15), new Sector_1.Sector(16), new Sector_1.Sector(17), new Sector_1.Sector(18), new Sector_1.Sector(19), new Sector_1.Sector(20), new Sector_1.Sector(21), new Sector_1.Sector(22), new Sector_1.Sector(23)];
        // ----------Массив position X позиция и начальной позиции Y конечная позиция Y высчитывается в зависимости от положения фишки в стеке фишек-------------
        _this.arrayPositionPoint = [new PIXI.Point(872, 60), new PIXI.Point(815, 60), new PIXI.Point(753, 60), new PIXI.Point(696, 60), new PIXI.Point(636, 60), new PIXI.Point(578, 60), new PIXI.Point(450, 60), new PIXI.Point(390, 60), new PIXI.Point(330, 60),
            new PIXI.Point(270, 60), new PIXI.Point(210, 60), new PIXI.Point(155, 60), new PIXI.Point(155, 715), new PIXI.Point(210, 715), new PIXI.Point(270, 715), new PIXI.Point(330, 715), new PIXI.Point(390, 715), new PIXI.Point(450, 715), new PIXI.Point(578, 715), new PIXI.Point(636, 715),
            new PIXI.Point(696, 715), new PIXI.Point(753, 715), new PIXI.Point(815, 715), new PIXI.Point(872, 715),];
        _this.bg.texture = _this.bg_skin;
        _this.addChild(_this.bg);
        _this.listenClick();
        _this.drawSectors();
        _this.drawState();
        _this.deactivationSectors(); //убираю интерактив с секторов что бы можно было нажать только на те на которых есть фишки
        return _this;
    }
    Board.prototype.setActive = function (isActive) {
        this._isActive = isActive;
    };
    Board.prototype.setPosition = function () {
        //задает позицию фишек
        for (var i = 0; i < this.arrayChips.length; i++) {
            for (var j = 0; j < this.arrayChips[i].length; j++) {
                if (i >= 0 && i < 12) {
                    this.arrayChips[i][j].position.set(this.arrayPositionPoint[i].x, this.arrayPositionPoint[i].y + this.OFFSET * j);
                }
                else {
                    this.arrayChips[i][j].position.set(this.arrayPositionPoint[i].x, this.arrayPositionPoint[i].y - this.OFFSET * j);
                }
            }
        }
    };
    Board.prototype.drawState = function () {
        //задает позицию фишек и рисует фишки
        for (var i = 0; i < this.arrayChips.length; i++) {
            for (var j = 0; j < this.arrayChips[i].length; j++) {
                this.setPosition();
                this.addChild(this.arrayChips[i][j]);
            }
        }
    };
    Board.prototype.setPositionSectors = function () {
        //задает позицию секторов которые отслеживают клики. сектора на доске скрыты
        for (var i = 0; i < this.arrayPositionPoint.length; i++) {
            if (i >= 0 && i < 12) {
                this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 30);
            }
            else {
                this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 745);
                this.arraySectors[i].rotation = -3.14;
            }
        }
    };
    Board.prototype.drawSectors = function () {
        //задает позицию сектора и добовляет его на доску
        for (var i = 0; i < this.arraySectors.length; i++) {
            this.setPositionSectors();
            this.addChild(this.arraySectors[i]);
        }
    };
    Board.prototype.listenClick = function () {
        //слушает клики на секторе
        for (var i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].on('click', this.sectorClick, this);
        }
    };
    Board.prototype.sectorClick = function (data) {
        //тут начинается магия
        if (this._isActive) {
            if (this.countClick == 0) {
                var correctClick = void 0;
                correctClick =
                    this.arrayChips[this.arraySectors.indexOf(data.target)][this.arrayChips[this.arraySectors.indexOf(data.target)].length - 1].colorChipWhite &&
                        this._activeColor == 0 ||
                        !(this.arrayChips[this.arraySectors.indexOf(data.target)][this.arrayChips[this.arraySectors.indexOf(data.target)].length - 1].colorChipWhite) &&
                            this._activeColor == 1;
                if (correctClick) {
                    this.sound.playSoundClickChip();
                    this.countClick++;
                    this.firsSelectSectorIndex = this.arraySectors.indexOf(data.target); // делаю это для того что бы можно было воспользоваться сектором на который кликнули первый раз т.е выбрали фишку
                    this.selectChip(this.firsSelectSectorIndex); //в этом методе фишка меняет скин на зеленый (активный)
                    this.deactivationAllSectors(); //убираю интерактив после выбора фишки со всем секторов кроме подсвеченных
                    this.highlightSector(this.firsSelectSectorIndex); //кидаю туда значение кубиков
                }
            }
            else if (this.countClick == 1) {
                this.secondSelectSectorIndex = this.arraySectors.indexOf(data.target);
                console.log(this.firsSelectSectorIndex != this.secondSelectSectorIndex);
                // this.moveChip(this.firsSelectSectorIndex, this.secondSelectSectorIndex);
                this.emit(Board.EVENT_MOVE_CHIP, {
                    CLASS_NAME: 'MoveChip',
                    oldPosition: this.firsSelectSectorIndex,
                    newPosition: this.secondSelectSectorIndex
                });
                this.deactivationChip(); //делаю фишку не активной
            }
        }
    };
    Board.prototype.selectChip = function (selectSectorIndex) {
        //передаю сюда сектор по которому кликнули первый раз ( индекс сектора совподает с индексом массива фишек )
        if (this.arrayChips[selectSectorIndex].length != 0) {
            if (this.countClick == 1) {
                if (this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].colorChipWhite) {
                    this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSprite.texture = this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSkinWhite_active;
                    this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].selectNow = true;
                    this.chipSelectGo = true;
                    this.selectChipWhite = true;
                }
                else {
                    this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSprite.texture = this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSkinBlack_active;
                    this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].selectNow = true;
                    this.chipSelectGo = true;
                    this.selectChipWhite = false;
                }
            }
        }
    };
    Board.prototype.deactivationChip = function () {
        //делаю сектор не активным
        for (var i = 0; i < this.arrayChips.length; i++) {
            for (var j = 0; j < this.arrayChips[i].length; j++) {
                if (this.arrayChips[i][j].colorChipWhite) {
                    this.arrayChips[i][j].chipSprite.texture = this.arrayChips[i][j].chipSkinWhite;
                    this.selectChipWhite = false;
                    this.chipSelectGo = false;
                }
                else
                    this.arrayChips[i][j].chipSprite.texture = this.arrayChips[i][j].chipSkinBlack;
                this.selectChipWhite = false;
                this.chipSelectGo = false;
            }
        }
    };
    Board.prototype.deactivationAllSectors = function () {
        for (var i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].interactiveOff();
        }
    };
    Board.prototype.deactivationSectors = function () {
        //убираю интерактив с секторов что бы можно было нажать только на подсвеченные сектора
        for (var i = 0; i < this.arrayChips.length; i++) {
            if (this.arrayChips[i].length == 0) {
                this.arraySectors[i].interactiveOff();
            }
            else {
                this.arraySectors[i].interactiveOn();
            }
        }
    };
    Board.prototype.offHighLightSectors = function () {
        for (var i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].greenTrianglSprite.visible = false;
            this.arraySectors[i].yellowTrianglSprite.visible = false;
        }
    };
    Board.prototype.getChipPosition = function (sectorIndex, chipIndex) {
        var x;
        var y;
        x = this.arrayPositionPoint[sectorIndex].x;
        if (this.arrayPositionPoint[sectorIndex].y == 715) {
            y = this.arrayPositionPoint[sectorIndex].y - this.OFFSET * chipIndex;
        }
        else {
            y = this.arrayPositionPoint[sectorIndex].y + this.OFFSET * chipIndex;
        }
        return new Point(x, y);
    };
    Board.prototype.startTurn = function (first, second, color) {
        this.dice[0] = first;
        this.dice[1] = second;
        this._activeColor = color;
        this._activeDices = [];
        if (first == second) {
            this._activeMoves = first * 4;
            this._activeDices.push(first);
            this._activeDices.push(first);
            this._activeDices.push(first);
            this._activeDices.push(first);
            this._activeDices.push(first * 2);
            this._activeDices.push(first * 2);
            this._activeDices.push(first * 3);
            this._activeDices.push(first * 4);
        }
        else {
            this._activeDices.push(first);
            this._activeDices.push(second);
            this._activeDices.push(first + second);
            this._activeMoves = first + second;
        }
        console.log('Активные кубики: ', this._activeMoves);
        console.log('Вариации возможных ходов: ', this._activeDices);
        this._isActive = this._activeMoves != 0;
    };
    Board.prototype.moveChip = function (oldPosition, newPosition) {
        var oldChip = this.arrayChips[oldPosition].pop();
        this.addChild(oldChip);
        var newPositionX = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).x;
        var newPositionY = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).y;
        TweenLite.to(oldChip, 0.5, {
            x: newPositionX,
            y: newPositionY,
            onStart: this.sound.playSoundMoveChip()
        });
        this.arrayChips[newPosition].push(oldChip);
        this.countClick = 0;
        var currentMove = Math.abs(newPosition - oldPosition);
        this._activeMoves -= currentMove;
        this._activeDices.splice(this._activeDices.indexOf(currentMove), 1);
        this._activeDices = this._activeDices.filter(function (number) {
            return number <= this._activeMoves;
        }, this);
        console.log('Сделан ход: ', currentMove);
        console.log('Активные кубики: ', this._activeMoves);
        console.log('Вариации возможных ходов: ', this._activeDices);
        this._isActive = this._activeMoves != 0;
        if (!this._isActive) {
            this.emit(Board.EVENT_END_OF_TURN);
        }
        this.offHighLightSectors(); //отключаю подсветку
        this.deactivationSectors(); //убираю интерактив с секторов что бы можно было нажать только на те на которых есть фишки
    };
    Board.prototype.highlightSector = function (sectorIndex) {
        if (!this.selectChipWhite) {
            this._activeDices.forEach(function (element) {
                if (sectorIndex + element <= 24)
                    this.calculateHighlights(sectorIndex + element);
            }, this);
        }
        else {
            this._activeDices.forEach(function (element) {
                this.calculateHighlights(sectorIndex - element);
            }, this);
        }
    };
    Board.prototype.calculateHighlights = function (way) {
        if (this.arrayChips[way].length != 0) {
            if (this.arrayChips[way][0].colorChipWhite == this.selectChipWhite) {
                this.arraySectors[way].highlightMove();
            }
            else {
                this.arraySectors[way].highlightAttack();
            }
        }
        else {
            this.arraySectors[way].highlightMove();
        }
    };
    Board.EVENT_END_OF_TURN = 'EndOfTurn';
    Board.EVENT_MOVE_CHIP = 'MoveChip';
    Board.EVENT_CHANGE_TABLE = 'ChangeTable';
    return Board;
}(Container));
exports.Board = Board;
