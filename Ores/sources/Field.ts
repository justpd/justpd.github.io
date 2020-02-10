import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import { MenuButton } from "./Button";
import { Game } from "./Game";
import { Tile } from "./Tile"
declare let TweenMax: any; // https://greensock.com/forums/topic/15365-not-able-to-move-div-in-angular-2/
declare let TimelineMax: any; // https://greensock.com/forums/topic/15365-not-able-to-move-div-in-angular-2/

export class Field extends Container {

    private tiles: Tile[][];
    public selectedTile: Tile;
    private _oresCount: number = 3;

    constructor() {
        super();
    }


    private startGame() {
        this.parent.emit("eventTimerStart");
        this.animateDestroy(this.findMatches());
    }

    private checkField() {
        this.animateDestroy(this.findMatches());
    }

    // Генерация игрового поля заполненного тайлами
    public generateField() {
        this.tiles = null;
        this.tiles = new Array<Tile[]>(8);

        let tileSize = 75;
        let paddingX = (Game.WIDTH - 8 * tileSize) / 2;
        let paddingY = (Game.HEIGHT - 8 * tileSize) / 2 + 100;

        for (let i = 0; i < 8; i++) {
            this.tiles[i] = new Array<Tile>(8);
            for (let j = 0; j < 8; j++) {
                let type = Math.floor(Math.random() * this._oresCount) + 1
                this.tiles[i][j] = new Tile(this, type, [i, j]);
                this.tiles[i][j].position.set(paddingX + j * tileSize, paddingY + i * tileSize);
                this.addChild(this.tiles[i][j]);
                this.tiles[i][j].setType(type, 1.5, 8);
            }
        }

        // Блокировка шариков в полёте
        this.switchInteractive(false);

        let tl = new TimelineMax({ repeat: 1, repeatDelay: 1.7, onComplete: this.startGame.bind(this) });
    }

    // Генерация тайлов после их уничтожения
    public generateTiles() {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j].type == 0)
                    this.tiles[i][j].setType(Math.floor(Math.random() * this._oresCount) + 1, 0.5, 2);
            }
        }

        let tl = new TimelineMax({ repeat: 1, repeatDelay: 0.5, onComplete: this.checkField.bind(this) });
    }

    // Унтичтожение игрового поля
    public destroyField() {
        if (this.tiles == null) return;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.tiles[i][j].destroy();
            }
        }
    }

    // Переключатель воздействия на элементы пользователем
    public switchInteractive(interactive: boolean) {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].switchInteractive(interactive);
            }
        }
    }

    // Подсветка соседнего тайла, елси онн образует новую комбинацию
    public createsNewMatch(s: Tile, n: Tile) {
        let temp = n.type;
        let currentMatches = this.findMatches().length;
        n.type = s.type;
        s.type = temp;
        let newMatches = this.findMatches().length;
        s.type = n.type;
        n.type = temp;

        if (newMatches > currentMatches) {
            return true;
        }

        return false;
    }

    // Подсветка клеток на которые возможно походить
    public highlightNeighbours(a: Tile) {
        // Верхний равен верхнему тайлу от текущего и проверки строки над вернхим тайлом, либо null
        let upper = this.tiles[a.pos.x - 1] && this.tiles[a.pos.x - 1][a.pos.y];
        let right = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y + 1];
        let bottom = this.tiles[a.pos.x + 1] && this.tiles[a.pos.x + 1][a.pos.y];
        let left = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y - 1];

        if (upper && this.createsNewMatch(a, upper)) {
            upper.highlight();
        }
        if (right && this.createsNewMatch(a, right)) {
            right.highlight();
        }
        if (bottom && this.createsNewMatch(a, bottom)) {
            bottom.highlight();
        }
        if (left && this.createsNewMatch(a, left)) {
            left.highlight();
        }
    }

    //  Отключение подсветки клеток на которые возможно походить
    public unHighlightNeighbours(a: Tile) {
        // Верхний равен верхнему тайлу от текущего и проверки строки над вернхим тайлом, либо null
        let upper = this.tiles[a.pos.x - 1] && this.tiles[a.pos.x - 1][a.pos.y];
        let right = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y + 1];
        let bottom = this.tiles[a.pos.x + 1] && this.tiles[a.pos.x + 1][a.pos.y];
        let left = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y - 1];

        if (upper && upper.highlighted) upper.unHighlight();
        if (right && right.highlighted) right.unHighlight();
        if (bottom && bottom.highlighted) bottom.unHighlight();
        if (left && left.highlighted) left.unHighlight();
    }

    // Гравитация или генерация шариков
    public dropTiles() {
        let shiftsCounter = this.dropLine();
        let tl = new TimelineMax({
            repeat: 1, repeatDelay: 0.225, onComplete: function () {
                if (shiftsCounter > 0) {
                    this.dropTiles();
                } else {
                    this.generateTiles();
                }
            }.bind(this)
        });
    }

    // Сдвиг шариков, если над пустой клеткой есть шарик
    public dropLine() {
        let shiftsCounter = 0;
        for (let j = 0; j < this.tiles.length; j++) {
            for (let i = this.tiles[j].length - 1; i >= 0; i--) {
                if (this.tiles[i][j].type == 0) {
                    if (this.tiles[i - 1]) {
                        if (this.tiles[i - 1][j].type != 0) shiftsCounter += 1;
                        this.tiles[i][j].setType(this.tiles[i - 1][j].type, 0.2);
                        this.tiles[i - 1][j].setType(0);
                    }
                }
            }
        }
        return shiftsCounter;
    }

    // Удаление совпадений
    public destroyMatches(matches: Tile[][]) {
        for (let i = 0; i < matches.length; i++) {
            for (let j = 0; j < matches[i].length; j++) {
                let t = matches[i][j];
                this.parent.emit('onComboUp');
                this.tiles[t.pos.x][t.pos.y].setType(0);
            }
        }
        let tl = new TimelineMax({ repeat: 1, repeatDelay: 0.25, onComplete: this.dropTiles.bind(this) });
    }

    // Анимация удаления совпадений
    public animateDestroy(matches: any) {
        if (matches.length > 0) {
            this.switchInteractive(false);
            for (let i = 0; i < matches.length; i++) {
                for (let j = 0; j < matches[i].length; j++) {
                    TweenMax.to(matches[i][j].item, 0.4, { alpha: 0, rotation: 2.5 });
                    TweenMax.to(matches[i][j].item.scale, 0.4, { x: 0, y: 0 });
                }
            }

            createjs.Sound.play(Game.SOUND_DESTROY, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 1);
            let tl = new TimelineMax({ repeat: 1, repeatDelay: 0.425, onComplete: this.destroyMatches.bind(this, matches) });
        } else {
            this.parent.emit('onComboEnd');
            this.switchInteractive(true);
        }
    }

    // Поиск возможных совпадений по горизонтали и цвертикали
    public findMatches() {
        let v_matches: Tile[][] = new Array();
        let h_matches: Tile[][] = new Array();
        let v_temp: Tile[];
        let h_temp: Tile[];

        let matches: any[] = new Array();

        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 1; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j].type == this.tiles[i][j - 1].type && this.tiles[i][j].type != 0) {
                    if (h_temp == null) {
                        h_temp = new Array();
                        h_temp.push(this.tiles[i][j]);
                        h_temp.push(this.tiles[i][j - 1]);
                    } else {
                        h_temp.push(this.tiles[i][j]);
                    }
                } else {
                    if (h_temp != null) {
                        if (h_temp.length > 2) {
                            h_matches.push(h_temp);
                        }

                        h_temp = null;
                    }
                }
            }
            if (h_temp != null) {
                if (h_temp.length > 2) {
                    h_matches.push(h_temp);
                }

                h_temp = null;
            }
        }

        for (let j = 0; j < this.tiles.length; j++) {
            for (let i = 1; i < this.tiles[j].length; i++) {
                if (this.tiles[i][j].type == this.tiles[i - 1][j].type && this.tiles[i][j].type != 0) {
                    if (v_temp == null) {
                        v_temp = new Array();
                        v_temp.push(this.tiles[i][j]);
                        v_temp.push(this.tiles[i - 1][j]);
                    } else {
                        v_temp.push(this.tiles[i][j]);
                    }
                } else {
                    if (v_temp != null) {
                        if (v_temp.length > 2) {
                            v_matches.push(v_temp);
                        }

                        v_temp = null;
                    }
                }
            }
            if (v_temp != null) {
                if (v_temp.length > 2) {
                    v_matches.push(v_temp);
                }

                v_temp = null;
            }
        }

        if (v_matches.length > 0) {
            for (let i = 0; i < v_matches.length; i++) {
                matches.push(v_matches[i]);
            }
        }

        if (h_matches.length > 0) {
            for (let i = 0; i < h_matches.length; i++) {
                matches.push(h_matches[i]);
            }
        }

        return (matches);
    }
}