import { Application, Assets, Text } from "pixi.js";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import { getButton } from "./getButton";
import { getCard } from "./getCard";
import { getAnnounceBox } from "./getAnnounceBox";
import { BaccaratManager } from "./BaccaratManager";

const app = new Application();
const appWidth:number = 800;
const appHeight:number = 600;

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
        width: appWidth,
        height: appHeight,
    });
    document.body.appendChild(app.canvas);
    gsap.registerPlugin(PixiPlugin);
}

async function preload()
{
    const assets = [
        {alias: 'button_bg', src: new URL('./assets/ui/green_button00.png', import.meta.url).href},
        {alias: 'announce_bg', src: new URL('./assets/ui/blue_panel.png', import.meta.url).href},
        
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
    const baccMan = new BaccaratManager();

    //simpleUI stuff

    //text stuff
    const bankerCardsText = new Text({text: "Banker Cards"});
    bankerCardsText.anchor.set(0.5);
    bankerCardsText.x = appWidth/2 - 200;
    bankerCardsText.y = 30;
    app.stage.addChild(bankerCardsText);

    const bankerTotalScoreText = new Text({text: "Total Score: 0"});
    bankerTotalScoreText.anchor.set(0.5);
    bankerTotalScoreText.x = bankerCardsText.x;
    bankerTotalScoreText.y = bankerCardsText.y + 150;
    app.stage.addChild(bankerTotalScoreText);
    

    const playerCardsText = new Text({text: "Player Cards"});
    playerCardsText.anchor.set(0.5);
    playerCardsText.x = appWidth/2 + 200;
    playerCardsText.y = 30;
    app.stage.addChild(playerCardsText);


    const playerTotalScoreText = new Text({text: "Total Score: 0"});
    playerTotalScoreText.anchor.set(0.5);
    playerTotalScoreText.x = playerCardsText.x;
    playerTotalScoreText.y = playerCardsText.y + 150;
    app.stage.addChild(playerTotalScoreText);


    const youBetOnText = new Text({text: "Please choose your bet"});
    youBetOnText.anchor.set(0.5);
    youBetOnText.x = appWidth/2;
    youBetOnText.y = appHeight/2;
    app.stage.addChild(youBetOnText);
    

    const yourWalletText = new Text({text: "Your Cash: 100"});
    yourWalletText.y = appHeight-30;
    app.stage.addChild(yourWalletText);


    //button stuff
    const dealButton = getButton("deal","Deal", buttonClicked);
    dealButton.x = appWidth/2;
    dealButton.y = appHeight - 80;

    const betPlayerButton = getButton("bet_player","bet on player", buttonClicked);
    betPlayerButton.x = appWidth/2 + 300;
    betPlayerButton.y = appHeight-200;
    
    const betBankerButton = getButton("bet_banker","bet on banker", buttonClicked);
    betBankerButton.x = appWidth/2 - 300;
    betBankerButton.y = appHeight-200;
    
    const betTieButton = getButton("bet_tie","bet on tie", buttonClicked);
    betTieButton.x = appWidth/2;
    betTieButton.y = appHeight-200;



    
    app.stage.addChild(dealButton);
    app.stage.addChild(betPlayerButton);
    app.stage.addChild(betBankerButton);
    app.stage.addChild(betTieButton);


    //card stuff
    const playerCard1 = getCard();
    playerCard1.x = appWidth/2 + 100;
    playerCard1.y = 100;
    playerCard1.scale.set(1.5);

    const playerCard2 = getCard();
    playerCard2.changeCard("C_K");
    playerCard2.x = appWidth/2 + 200;
    playerCard2.y = 100;
    playerCard2.scale.set(1.5);

    const playerCard3 = getCard();
    playerCard3.changeCard("C_10");
    playerCard3.x = appWidth/2 + 300;
    playerCard3.y = 100;
    playerCard3.scale.set(1.5);

    const bankerCard1 = getCard();
    bankerCard1.x = appWidth/2 - 300;
    bankerCard1.y = 100;
    bankerCard1.scale.set(1.5);

    const bankerCard2 = getCard();
    bankerCard2.x = appWidth/2 - 200;
    bankerCard2.y = 100;
    bankerCard2.scale.set(1.5);
    
    const bankerCard3 = getCard();
    bankerCard3.x = appWidth/2 - 100;
    bankerCard3.y = 100;
    bankerCard3.scale.set(1.5);



    app.stage.addChild(playerCard1);
    app.stage.addChild(playerCard2);
    app.stage.addChild(playerCard3);

    app.stage.addChild(bankerCard1);
    app.stage.addChild(bankerCard2);
    app.stage.addChild(bankerCard3);

    //announcebox
    const announceBox = getAnnounceBox();
    announceBox.x = appWidth/2;
    announceBox.y = appHeight/2-100;
    announceBox.visible = false;
    app.stage.addChild(announceBox);

    function buttonClicked(id:String)
    {
        // console.log("clicked "+id);
        switch(id){
            case 'deal':
                let results = baccMan.PlayAndGetResults();
                console.log(results);
                break;

            case 'bet_player':
                break;
                
            case 'bet_banker':
                break;
                
            case 'bet_tie':
                break;
                
        }
    }

}