import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { Field } from "./Field";
import { Game } from "./Game";

declare let TweenMax: any;
declare let TimelineMax: any;

export class Tile extends Container {
    public item: Sprite;
    private _background: Sprite;
    private _itemTextures: Texture[] = [
        null, // Пустая клетка
        Game.RES.redBall.texture,
        Game.RES.orangeBall.texture,
        Game.RES.greenBall.texture,
        Game.RES.dkBlueBall.texture,
        Game.RES.blueBall.texture,
        Game.RES.purpleBall.texture,
        Game.RES.whiteBall.texture,
    ];
    private fieldTextures: Texture[] = [
        Game.RES.field.texture,
        Game.RES.fieldHighlighted.texture
    ];

    protected pressedAlpha: number = 0.4;
    protected isOver: boolean = true;
    protected isDown: boolean = false;

    private _state: number;
    private _field: Field;
    private States = {
        "IDLE": 1,
        "SELECTED": 2,
        "DISABLED": 3
    }

    public pos = {
        "x": 0,
        "y": 0
    }
    public type: number;
    public highlighted: boolean;

    private setState(state: any): void {
        this._state = state;
    }

    constructor(field: Field, type: number, pos: number[]) {
        super();

        this._background = new Sprite(Game.RES.field.texture);
        this.addChild(this._background);

        this.pos.x = pos[0];
        this.pos.y = pos[1];
        this.item = new Sprite();
        this.item.scale.set(0.8);
        this.item.anchor.set(0.5);
        this.item.position.set(75 / 2, 75 / 2);
        this.item.interactive = true;
        this.item.buttonMode = true;

        this._field = field;

        this.setState(this.States.IDLE);

        this.item.on("pointerover", function (): void {
            if (this._state == this.States.IDLE) {
                this.item.alpha = 0.75;
            }
        }.bind(this));

        this.item.on("pointerout", function (): void {
            if (this._state == this.States.IDLE) {
                this.item.alpha = 1;
            }
        }.bind(this));

        this.item.on("pointerdown", function (): void {
            if (this._state == this.States.IDLE) {
                this.select();
            } else {
                if (this._state == this.States.SELECTED) {
                    this.deselect();
                }
            }
        }.bind(this));

        this.item.on("pointerupoutside", function (): void {
            if (this._state == this.States.SELECTED) {
                this.deselect();
            }
        }.bind(this));

        this.setType(type);
        this.addChild(this.item);
    }

    // Выбор шарика
    public select(): void {
        if (this._field.getSelectedTile() == null) {
            TweenMax.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: this.pressedAlpha });
            this._field.setSelectedTile(this);
            this.setState(this.States.SELECTED);
            this._field.highlightNeighbours(this);
            createjs.Sound.play(Game.SOUND_SELECT, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
        } else {
            this.swap();
        }
    }

    // Отмена выбора шарика
    public deselect(playSound: boolean = true): void {
        if (this._field.getSelectedTile() == this) {
            this._field.setSelectedTile(null);
        }
        this._field.unHighlightNeighbours(this);
        this.setState(this.States.IDLE);
        TweenMax.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: 1 });
        if (playSound)
            createjs.Sound.play(Game.SOUND_UNSELECT, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
    }

    // Смена позиций двух шариков между друг другом
    public swap(): void {
        if (this.highlighted) {

            let selectedTile = this._field.getSelectedTile();

            this._field.switchInteractive(false);
            this._field.unHighlightNeighbours(selectedTile);
            let y1 = (selectedTile.pos.x - this.pos.x) * 75;
            let x1 = (selectedTile.pos.y - this.pos.y) * 75;

            selectedTile.item.alpha = 1;
            this.item.alpha = 1;


            TweenMax.to(this.item, 0.75, { x: this.item.x + x1, y: this.item.y + y1 });
            TweenMax.to(selectedTile.item, 0.75, { x: this.item.x - x1, y: this.item.y - y1 });
            let tl = new TimelineMax({
                repeat: 1, repeatDelay: 0.8, onComplete: function () {
                    let temp = this.type;
                    var selected = this._field.getSelectedTile();
                    this.setType(selected.type);
                    selected.setType(temp);
                    TweenMax.set(this.item, { x: 37.5, y: 37.5 });
                    TweenMax.set(selected.item, { x: 37.5, y: 37.5 });
                    selected.deselect(false);

                    let matches = this._field.findMatches();
                    this._field.animateDestroy(matches);
                }.bind(this)
            });
        }
    }

    // Установка типа шарика
    public setType(t: number, fall: number = 0, mult: number = 1, event: string = ""): void {
        if (fall > 0) {
            let tl = new TimelineMax({ onComplete: this.onTileFall.bind(this, event) });
            tl.fromTo(this.item, fall, { y: this.item.y - 75 * mult }, { y: this.item.y });
        }
        this.type = t;
        this.item.texture = this._itemTextures[this.type];
        this.item.alpha = 1;
        this.item.rotation = 0;
        this.item.scale.set(0.8);
    }

    public onTileFall(event: string): void {
        if (this.parent && event != "")
            this.parent.emit(event);
    }

    // Подсветка клетки
    public highlight(): void {
        if (this._background.texture == this.fieldTextures[0]) {
            this._background.texture = this.fieldTextures[1];
        }
        this.highlighted = true;
    }

    // Отмена подсветки клетки
    public unHighlight(): void {
        if (this._background.texture == this.fieldTextures[1]) {
            this._background.texture = this.fieldTextures[0];
        }
        this.highlighted = false;
    }

    // Переключатель воздействия на элементы пользователем
    public switchInteractive(interactive: boolean): void {
        this.item.interactive = interactive;
        this.item.buttonMode = interactive;
    }
}