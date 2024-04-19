import { Application, Assets } from "pixi.js";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import { getButton } from "./getButton";
import { getCard } from "./getCard";

const app = new Application();

(async()=>
{
    await setup();
    await preload();
    await play();
})();

async function setup()
{
    await app.init({
        background:"#1099bb", 
        //resizeTo: window
        width: 800,
        height: 600,
    });
    document.body.appendChild(app.canvas);
    gsap.registerPlugin(PixiPlugin);
}

async function preload()
{
    const assets = [
        {alias: 'button_bg', src: new URL('./assets/ui/green_button00.png', import.meta.url).href},
        {alias: 'card_back', src: new URL('./assets/cards/card_back.png', import.meta.url).href},
        {alias: 'C_2', src: new URL('./assets/cards/card_spades_02.png', import.meta.url).href},
        {alias: 'C_3', src: new URL('./assets/cards/card_spades_03.png', import.meta.url).href},
        {alias: 'C_4', src: new URL('./assets/cards/card_spades_04.png', import.meta.url).href},
        {alias: 'C_5', src: new URL('./assets/cards/card_spades_05.png', import.meta.url).href},
        {alias: 'C_6', src: new URL('./assets/cards/card_spades_06.png', import.meta.url).href},
        {alias: 'C_7', src: new URL('./assets/cards/card_spades_07.png', import.meta.url).href},
        {alias: 'C_8', src: new URL('./assets/cards/card_spades_08.png', import.meta.url).href},
        {alias: 'C_9', src: new URL('./assets/cards/card_spades_09.png', import.meta.url).href},
        {alias: 'C_10', src: new URL('./assets/cards/card_spades_10.png', import.meta.url).href},
        {alias: 'C_A', src: new URL('./assets/cards/card_spades_A.png', import.meta.url).href},
        {alias: 'C_K', src: new URL('./assets/cards/card_spades_K.png', import.meta.url).href},
        {alias: 'C_Q', src: new URL('./assets/cards/card_spades_Q.png', import.meta.url).href},
        {alias: 'C_J', src: new URL('./assets/cards/card_spades_J.png', import.meta.url).href},
    ];

    await Assets.load(assets);
}

async function play()
{
    const button1 = getButton();
    app.stage.addChild(button1);

    const card1 = getCard();
    app.stage.addChild(card1);
    card1.x = 100;
    card1.y = 100;
    card1.scale.set(2);
}