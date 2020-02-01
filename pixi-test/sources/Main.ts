import Application = PIXI.Application;
import {Game} from "./Game";

const loader = new PIXI.Loader();
loader.add('./assets/MKX.ttf');
loader.add('stageBackground', './assets/images/back.png');
loader.add('buttonBox', './assets/images/LinedBox.png');
loader.add('titleLine', './assets/images/MonoLine.png');
loader.load(setup);

let application:Application = new Application({backgroundColor: 0x000000 });
document.body.appendChild(application.view);



function eventListenerResize():void
{
    application.renderer.resize(window.innerWidth, window.innerHeight);
    let scale:number = Math.min(window.innerWidth / Game.WIDTH, window.innerHeight / Game.HEIGHT);
    application.stage.x = (window.innerWidth - Game.WIDTH * scale) / 2;
    application.stage.y = (window.innerHeight - Game.HEIGHT * scale) / 2;
    application.stage.scale.x = scale;
    application.stage.scale.y = scale;
    application.render();
}

eventListenerResize();
window.onresize = eventListenerResize;
window.onorientationchange = eventListenerResize;

function setup(loader: PIXI.Loader, resources: any):void
{
    let game: Game = new Game(resources);
    application.stage.addChild(game);
    document.addEventListener('keydown', game.eventKeyboardInput.bind(game));
    document.addEventListener('keyup', game.eventKeyboardInput.bind(game));
}