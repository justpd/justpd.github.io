define(["require", "exports", "./Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Application = PIXI.Application;
    var loader = new PIXI.Loader();
    loader.add('./assets/MKX.ttf');
    loader.add('stageBackground', './assets/images/back.png');
    loader.add('buttonBox', './assets/images/LinedBox.png');
    loader.add('titleLine', './assets/images/MonoLine.png');
    loader.load(setup);
    var application = new Application({ backgroundColor: 0x000000 });
    document.body.appendChild(application.view);
    function eventListenerResize() {
        application.renderer.resize(window.innerWidth, window.innerHeight);
        var scale = Math.min(window.innerWidth / Game_1.Game.WIDTH, window.innerHeight / Game_1.Game.HEIGHT);
        application.stage.x = (window.innerWidth - Game_1.Game.WIDTH * scale) / 2;
        application.stage.y = (window.innerHeight - Game_1.Game.HEIGHT * scale) / 2;
        application.stage.scale.x = scale;
        application.stage.scale.y = scale;
        application.render();
    }
    eventListenerResize();
    window.onresize = eventListenerResize;
    window.onorientationchange = eventListenerResize;
    function setup(loader, resources) {
        var game = new Game_1.Game(resources);
        application.stage.addChild(game);
        document.addEventListener('keydown', game.eventKeyboardInput.bind(game));
        document.addEventListener('keyup', game.eventKeyboardInput.bind(game));
    }
});
//# sourceMappingURL=Main.js.map