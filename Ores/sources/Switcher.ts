import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { Game } from "./Game";

export class Switcher extends Container {

    private sprite: Sprite;

    constructor(_norm: Texture, _switch: Texture) {
        super();

        this.sprite = new Sprite(_norm);
        this.sprite.anchor.set(0.5);
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;

        this.sprite.on("pointerover", function (): void {
            this.sprite.alpha = 0.75;
        }.bind(this));

        this.sprite.on("pointerout", function (): void {
            this.sprite.alpha = 1;
        }.bind(this));

        this.sprite.on("pointeroutside", function (): void {
            this.sprite.alpha = 1;
        }.bind(this));

        this.sprite.on("pointerdown", function (): void {
            this.sprite.alpha = 0.55;
        }.bind(this));

        this.sprite.on("pointerup", function (): void {
            if (this.sprite.texture == _norm) {
                this.sprite.interactive = false;
                this.sprite.texture = _switch;
                createjs.Sound.setMute(true);
                setTimeout(function () {
                    this.sprite.alpha = 1;
                    this.sprite.interactive = true;
                }.bind(this), 50);
            } else {
                this.sprite.interactive = false;
                this.sprite.texture = _norm;
                createjs.Sound.setMute(false);
                setTimeout(function () {
                    this.sprite.alpha = 1;
                    this.sprite.interactive = true;
                }.bind(this), 50);
            }
        }.bind(this));

        this.addChild(this.sprite);
    }
}