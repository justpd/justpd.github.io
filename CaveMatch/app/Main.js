define(["require", "exports", "./Game", "./Button"], function (require, exports, Game_1, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Application = PIXI.Application;
    var Loader = PIXI.Loader;
    var loader = new Loader();
    // Подгрузка ресурсов через PIXI loader
    loader.add("redBall", "./resources/assets/images/balls/redBall.png");
    loader.add("whiteBall", "./resources/assets/images/balls/whiteBall.png");
    loader.add("orangeBall", "./resources/assets/images/balls/orangeBall.png");
    loader.add("greenBall", "./resources/assets/images/balls/greenBall.png");
    loader.add("dkBlueBall", "./resources/assets/images/balls/dkBlueBall.png");
    loader.add("blueBall", "./resources/assets/images/balls/blueBall.png");
    loader.add("purpleBall", "./resources/assets/images/balls/purpleBall.png");
    loader.add("_red", "./resources/assets/images/items/01.png");
    loader.add("_orange", "./resources/assets/images/items/02.png");
    loader.add("_green", "./resources/assets/images/items/03.png");
    loader.add("_blue", "./resources/assets/images/items/04.png");
    loader.add("_pink", "./resources/assets/images/items/05.png");
    loader.add("_bomb", "./resources/assets/images/items/00.png");
    loader.add("s_red", "./resources/assets/images/items/s_01.png");
    loader.add("s_orange", "./resources/assets/images/items/s_02.png");
    loader.add("s_green", "./resources/assets/images/items/s_03.png");
    loader.add("s_blue", "./resources/assets/images/items/s_04.png");
    loader.add("s_pink", "./resources/assets/images/items/s_05.png");
    loader.add("s_bomb", "./resources/assets/images/items/s_00.png");
    loader.add("_bg_0", "./resources/assets/images/items/bg_0.png");
    loader.add("_bg_1", "./resources/assets/images/items/bg_1.png");
    loader.add("_bg_2", "./resources/assets/images/items/bg_2.png");
    loader.add("_bg_3", "./resources/assets/images/items/bg_3.png");
    loader.add("background", "./resources/assets/images/field/background.png");
    loader.add("menuButtonNormal", "./resources/assets/images/buttons/menuButtonNormal.png");
    loader.add("menuButtonPress", "./resources/assets/images/buttons/menuButtonPress.png");
    loader.add("lvlNormal", "./resources/assets/images/buttons/lvlNormal.png");
    loader.add("lvlPress", "./resources/assets/images/buttons/lvlPress.png");
    loader.add("playButtonNormal", "./resources/assets/images/buttons/playButtonNormal.png");
    loader.add("playButtonPressed", "./resources/assets/images/buttons/playButtonPressed.png");
    loader.add("soundSwitcherOff", "./resources/assets/images/buttons/soundButtonOff.png");
    loader.add("soundSwitcherOn", "./resources/assets/images/buttons/soundButtonOn.png");
    loader.load(setup);
    var app = new Application({
        antialias: true,
        transparent: true,
        resolution: 1
    });
    var startButton;
    // Изменение размеров приложения PIXI при изменинеии размеров окна
    function eventListenerResize() {
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        var scale = Math.min(window.innerWidth / Game_1.Game.WIDTH, window.innerHeight / Game_1.Game.HEIGHT);
        app.stage.x = (window.innerWidth - Game_1.Game.WIDTH * scale) / 2;
        app.stage.y = (window.innerHeight - Game_1.Game.HEIGHT * scale) / 2;
        app.stage.scale.x = scale;
        app.stage.scale.y = scale;
        app.render();
    }
    eventListenerResize();
    window.onresize = eventListenerResize;
    // Функция вызываемая после подгрузки ресурсов
    function setup(loader, resources) {
        document.body.appendChild(app.view);
        startButton = new Button_1.Button(resources.playButtonNormal.texture, resources.playButtonPressed.texture);
        startButton.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT / 2);
        startButton.on('click', function () {
            var game = new Game_1.Game(resources);
            app.stage.addChild(game);
            app.stage.removeChild(startButton);
        });
        app.stage.addChild(startButton);
    }
});
//# sourceMappingURL=Main.js.map