import Application = PIXI.Application;
import Loader = PIXI.Loader;
import { Game } from "./Game"
import { Button } from "./Button"

const loader: Loader = new Loader();

// Подгрузка ресурсов через PIXI loader
loader.add("redBall", "./resources/assets/images/balls/redBall.png");
loader.add("whiteBall", "./resources/assets/images/balls/whiteBall.png");
loader.add("orangeBall", "./resources/assets/images/balls/orangeBall.png");
loader.add("greenBall", "./resources/assets/images/balls/greenBall.png");
loader.add("dkBlueBall", "./resources/assets/images/balls/dkBlueBall.png");
loader.add("blueBall", "./resources/assets/images/balls/blueBall.png");
loader.add("purpleBall", "./resources/assets/images/balls/purpleBall.png");
loader.add("background", "./resources/assets/images/field/background.png");
loader.add("field", "./resources/assets/images/field/field.png");
loader.add("fieldHighlighted", "./resources/assets/images/field/field_highlighted.png");
loader.add("menuButtonNormal", "./resources/assets/images/buttons/menuButtonNormal.png");
loader.add("menuButtonPress", "./resources/assets/images/buttons/menuButtonPress.png");
loader.add("lvlNormal", "./resources/assets/images/buttons/lvlNormal.png");
loader.add("lvlPress", "./resources/assets/images/buttons/lvlPress.png");
loader.add("playButtonNormal", "./resources/assets/images/buttons/playButtonNormal.png");
loader.add("playButtonPressed", "./resources/assets/images/buttons/playButtonPressed.png");
loader.add("soundSwitcherOff", "./resources/assets/images/buttons/soundButtonOff.png");
loader.add("soundSwitcherOn", "./resources/assets/images/buttons/soundButtonOn.png");
loader.load(setup);


let app: Application = new Application({
    antialias: true,
    transparent: true,
    resolution: 1
});

let startButton: Button;

// Изменение размеров приложения PIXI при изменинеии размеров окна
function eventListenerResize(): void {
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    let scale = Math.min(window.innerWidth / Game.WIDTH, window.innerHeight / Game.HEIGHT);
    app.stage.x = (window.innerWidth - Game.WIDTH * scale) / 2;
    app.stage.y = (window.innerHeight - Game.HEIGHT * scale) / 2;
    app.stage.scale.x = scale;
    app.stage.scale.y = scale;
    app.render();
}

eventListenerResize();
window.onresize = eventListenerResize;

// Функция вызываемая после подгрузки ресурсов
function setup(loader: Loader, resources: any): void {

    document.body.appendChild(app.view);

    startButton = new Button(resources.playButtonNormal.texture, resources.playButtonPressed.texture);
    startButton.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
    startButton.on('click', function () {
        let game: Game = new Game(resources);
        app.stage.addChild(game);
        app.stage.removeChild(startButton);
    });

    app.stage.addChild(startButton);
}