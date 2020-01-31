let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

let app = new PIXI.Application({
    backgroundColor: 0x1099bb
});

app.renderer.view.style.position = "absolute"
app.renderer.view.style.display = "block"
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);


// const bunny = PIXI.Sprite.from('/1.png');
// app.stage.addChild(bunny);

const loader = new PIXI.Loader();

loader.add('bunny', '1.png');

loader.load((loader, resources) => {
    let bunny = new PIXI.Sprite(resources.bunny.texture);
    bunny.crossOrigin = 'anonymity';
    console.log(bunny.crossOrigin);
    app.stage.addChild(bunny);
});