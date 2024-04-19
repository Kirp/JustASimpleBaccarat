import { Application, Assets } from "pixi.js";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import { getButton } from "./getButton";

const app = new Application();

(async()=>
{
    await setup();
    await preload();
    await play();
})();

async function setup()
{
    await app.init({background:"#1099bb", resizeTo: window});
    document.body.appendChild(app.canvas);
    gsap.registerPlugin(PixiPlugin);
}

async function preload()
{
    const assets = [
        {alias: 'button_bg', src: new URL('./assets/ui/green_button00.png', import.meta.url).href},
        {alias: 'card_back', src: new URL('./assets/cards/card_back.png', import.meta.url).href},
    ];

    await Assets.load(assets);
}

async function play()
{
    const button1 = getButton();
    app.stage.addChild(button1);
}