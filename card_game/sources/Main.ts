import Application = PIXI.Application;
import Loader = PIXI.Loader;
import { Game } from "./Game"
import { NetworkProvider } from "./NetworkProvider"

const loader: Loader = new Loader();

// Подгрузка ресурсов через PIXI loader
loader.onLoad.add(loadingStep)
loader.onComplete.add(loadingStep)

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

loader.load()

function loadingStep(): void
{
    let progress: number = Math.ceil(loader.progress);
    let progressFormated: string;
    if (progress < 10)
        progressFormated = `  ${progress.toString()}`;
    else if (progress < 100)
        progressFormated = ` ${progress.toString()}`;
    else
        progressFormated = progress.toString();

    let color = '#' + Math.floor(Math.random() * 10000000 + 6777215).toString(16);
    console.log(`====== LOADING FILES ====== ` + `%c${progressFormated}%`, `color:${color}`,  `======`);

    if (progress == 100)
        setup(loader, loader.resources);
}


let app: Application = new Application({
    antialias: true,
    transparent: true,
    resolution: 1
});


// Изменение размеров приложения PIXI при изменинеии размеров окна
function eventListenerResize(): void
{
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
function setup(loader: Loader, resources: any): void
{
    loader.onComplete.detachAll();
    document.body.appendChild(app.view);
    console.log(`====== ` + `%cLAUNCHING APPLICATION`, `color:#5c5`,  `==========`);
    let game: Game = new Game(resources);
    app.stage.addChild(game);
}