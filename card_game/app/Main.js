define(["require", "exports", "./Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Application = PIXI.Application;
    var Loader = PIXI.Loader;
    var loader = new Loader();
    // Подгрузка ресурсов через PIXI loader
    loader.onLoad.add(loadingStep);
    loader.onComplete.add(loadingStep);
    loader.add("_red", "./resources/assets/images/01.png");
    loader.add("_orange", "./resources/assets/images/02.png");
    loader.add("_green", "./resources/assets/images/03.png");
    loader.add("_blue", "./resources/assets/images/04.png");
    loader.add("_pink", "./resources/assets/images/05.png");
    loader.add("_bomb", "./resources/assets/images/00.png");
    loader.add("s_red", "./resources/assets/images/s_01.png");
    loader.add("s_orange", "./resources/assets/images/s_02.png");
    loader.add("s_green", "./resources/assets/images/s_03.png");
    loader.add("s_blue", "./resources/assets/images/s_04.png");
    loader.add("s_pink", "./resources/assets/images/s_05.png");
    loader.add("s_bomb", "./resources/assets/images/s_00.png");
    loader.add("_bg_0", "./resources/assets/images/bg_0.png");
    loader.add("_bg_1", "./resources/assets/images/bg_1.png");
    loader.add("_bg_2", "./resources/assets/images/bg_2.png");
    loader.add("_bg_3", "./resources/assets/images/bg_3.png");
    loader.add("_background", "./resources/assets/images/bg.png");
    loader.add("_unispaceFont", "./resources/assets/unispace.woff");
    loader.add("_visitor2Font", "./resources/assets/visitor2.woff");
    loader.load();
    function loadingStep() {
        var progress = Math.ceil(loader.progress);
        var progressFormated;
        if (progress < 10)
            progressFormated = "  " + progress.toString();
        else if (progress < 100)
            progressFormated = " " + progress.toString();
        else
            progressFormated = progress.toString();
        var color = '#' + Math.floor(Math.random() * 10000000 + 6777215).toString(16);
        console.log("====== LOADING FILES ====== " + ("%c" + progressFormated + "%"), "color:" + color, "======");
        if (progress == 100)
            setup(loader, loader.resources);
    }
    var app = new Application({
        antialias: true,
        transparent: true,
        resolution: 1
    });
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
        loader.onComplete.detachAll();
        document.body.appendChild(app.view);
        console.log("====== " + "%cLAUNCHING APPLICATION", "color:#5c5", "==========");
        var game = new Game_1.Game(resources);
        app.stage.addChild(game);
    }
});
//# sourceMappingURL=Main.js.map