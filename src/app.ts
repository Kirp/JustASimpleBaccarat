import { Application, Assets, Text, Container } from "pixi.js";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import { getButton } from "./getButton";
import { getCard } from "./getCard";
import { getAnnounceBox } from "./getAnnounceBox";
import { ResultData } from "./ResultData";
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
        {alias: 'C_2', src: new URL('./assets/cards/card_clubs_02.png', import.meta.url).href},
        {alias: 'C_3', src: new URL('./assets/cards/card_clubs_03.png', import.meta.url).href},
        {alias: 'C_4', src: new URL('./assets/cards/card_clubs_04.png', import.meta.url).href},
        {alias: 'C_5', src: new URL('./assets/cards/card_clubs_05.png', import.meta.url).href},
        {alias: 'C_6', src: new URL('./assets/cards/card_clubs_06.png', import.meta.url).href},
        {alias: 'C_7', src: new URL('./assets/cards/card_clubs_07.png', import.meta.url).href},
        {alias: 'C_8', src: new URL('./assets/cards/card_clubs_08.png', import.meta.url).href},
        {alias: 'C_9', src: new URL('./assets/cards/card_clubs_09.png', import.meta.url).href},
        {alias: 'C_10', src: new URL('./assets/cards/card_clubs_10.png', import.meta.url).href},
        {alias: 'C_A', src: new URL('./assets/cards/card_clubs_A.png', import.meta.url).href},
        {alias: 'C_K', src: new URL('./assets/cards/card_clubs_K.png', import.meta.url).href},
        {alias: 'C_Q', src: new URL('./assets/cards/card_clubs_Q.png', import.meta.url).href},
        {alias: 'C_J', src: new URL('./assets/cards/card_clubs_J.png', import.meta.url).href},
        
        {alias: 'H_2', src: new URL('./assets/cards/card_hearts_02.png', import.meta.url).href},
        {alias: 'H_3', src: new URL('./assets/cards/card_hearts_03.png', import.meta.url).href},
        {alias: 'H_4', src: new URL('./assets/cards/card_hearts_04.png', import.meta.url).href},
        {alias: 'H_5', src: new URL('./assets/cards/card_hearts_05.png', import.meta.url).href},
        {alias: 'H_6', src: new URL('./assets/cards/card_hearts_06.png', import.meta.url).href},
        {alias: 'H_7', src: new URL('./assets/cards/card_hearts_07.png', import.meta.url).href},
        {alias: 'H_8', src: new URL('./assets/cards/card_hearts_08.png', import.meta.url).href},
        {alias: 'H_9', src: new URL('./assets/cards/card_hearts_09.png', import.meta.url).href},
        {alias: 'H_10', src: new URL('./assets/cards/card_hearts_10.png', import.meta.url).href},
        {alias: 'H_A', src: new URL('./assets/cards/card_hearts_A.png', import.meta.url).href},
        {alias: 'H_K', src: new URL('./assets/cards/card_hearts_K.png', import.meta.url).href},
        {alias: 'H_Q', src: new URL('./assets/cards/card_hearts_Q.png', import.meta.url).href},
        {alias: 'H_J', src: new URL('./assets/cards/card_hearts_J.png', import.meta.url).href},
        
        {alias: 'S_2', src: new URL('./assets/cards/card_spades_02.png', import.meta.url).href},
        {alias: 'S_3', src: new URL('./assets/cards/card_spades_03.png', import.meta.url).href},
        {alias: 'S_4', src: new URL('./assets/cards/card_spades_04.png', import.meta.url).href},
        {alias: 'S_5', src: new URL('./assets/cards/card_spades_05.png', import.meta.url).href},
        {alias: 'S_6', src: new URL('./assets/cards/card_spades_06.png', import.meta.url).href},
        {alias: 'S_7', src: new URL('./assets/cards/card_spades_07.png', import.meta.url).href},
        {alias: 'S_8', src: new URL('./assets/cards/card_spades_08.png', import.meta.url).href},
        {alias: 'S_9', src: new URL('./assets/cards/card_spades_09.png', import.meta.url).href},
        {alias: 'S_10', src: new URL('./assets/cards/card_spades_10.png', import.meta.url).href},
        {alias: 'S_A', src: new URL('./assets/cards/card_spades_A.png', import.meta.url).href},
        {alias: 'S_K', src: new URL('./assets/cards/card_spades_K.png', import.meta.url).href},
        {alias: 'S_Q', src: new URL('./assets/cards/card_spades_Q.png', import.meta.url).href},
        {alias: 'S_J', src: new URL('./assets/cards/card_spades_J.png', import.meta.url).href},
        
        {alias: 'D_2', src: new URL('./assets/cards/card_diamonds_02.png', import.meta.url).href},
        {alias: 'D_3', src: new URL('./assets/cards/card_diamonds_03.png', import.meta.url).href},
        {alias: 'D_4', src: new URL('./assets/cards/card_diamonds_04.png', import.meta.url).href},
        {alias: 'D_5', src: new URL('./assets/cards/card_diamonds_05.png', import.meta.url).href},
        {alias: 'D_6', src: new URL('./assets/cards/card_diamonds_06.png', import.meta.url).href},
        {alias: 'D_7', src: new URL('./assets/cards/card_diamonds_07.png', import.meta.url).href},
        {alias: 'D_8', src: new URL('./assets/cards/card_diamonds_08.png', import.meta.url).href},
        {alias: 'D_9', src: new URL('./assets/cards/card_diamonds_09.png', import.meta.url).href},
        {alias: 'D_10', src: new URL('./assets/cards/card_diamonds_10.png', import.meta.url).href},
        {alias: 'D_A', src: new URL('./assets/cards/card_diamonds_A.png', import.meta.url).href},
        {alias: 'D_K', src: new URL('./assets/cards/card_diamonds_K.png', import.meta.url).href},
        {alias: 'D_Q', src: new URL('./assets/cards/card_diamonds_Q.png', import.meta.url).href},
        {alias: 'D_J', src: new URL('./assets/cards/card_diamonds_J.png', import.meta.url).href},

    ];

    await Assets.load(assets);
}

async function play()
{
    let playerCash = 100;
    let cashPerBet = 1;
    const baccMan = new BaccaratManager();
    let lastResult:ResultData;
    let betPlacedOn:string = "P";
    let lastWinnings:number = 0;
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
    

    const yourWalletText = new Text({text: "Your Cash: "+playerCash});
    yourWalletText.y = appHeight-30;
    app.stage.addChild(yourWalletText);


    //button stuff
    const dealButton = getButton("deal","Deal", buttonClicked);
    dealButton.x = appWidth/2;
    dealButton.y = appHeight - 80;

    const betButtonContainer = new Container();
    betButtonContainer.visible = false; 

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
    app.stage.addChild(betButtonContainer);
    betButtonContainer.addChild(betPlayerButton);
    betButtonContainer.addChild(betBankerButton);
    betButtonContainer.addChild(betTieButton);


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
    announceBox.y = appHeight/2 + 45;
    announceBox.visible = false;
    app.stage.addChild(announceBox);

    function resetForDeal()
    {
        //just clean things up for the game phase
        betPlacedOn = "";
        //hide announcement box
        announceBox.visible = false;

        //hide all bet buttons
        betButtonContainer.visible = false;

        //hide you bet text
        youBetOnText.visible = false;

        //reset and hide total numbers
        bankerTotalScoreText.text = 0;
        bankerTotalScoreText.visible = false;
        playerTotalScoreText.text = 0;
        playerTotalScoreText.visible = false;

        //hide all cards
        playerCard1.ShowFront(false);
        playerCard1.visible = false;

        playerCard2.ShowFront(false);
        playerCard2.visible = false;
        
        playerCard3.ShowFront(false);
        playerCard3.visible = false;
        
        bankerCard1.ShowFront(false);
        bankerCard1.visible = false;

        bankerCard2.ShowFront(false);
        bankerCard2.visible = false;
        
        bankerCard3.ShowFront(false);
        bankerCard3.visible = false;
        
        //try to use gsap
        //intro sequence
        dealAnimationInitialCards();
    }

    function dealAnimationInitialCards()
    {
        playerCard1.visible = true;
        gsap.from(playerCard1, {y:-500,duration:0.5});
        playerCard2.visible = true;
        gsap.from(playerCard2, {y:-500,duration:0.5});

        bankerCard1.visible = true;
        gsap.from(bankerCard1, {y:-500, duration:0.5});

        bankerCard2.visible = true;
        gsap.from(bankerCard2, {y:-500, duration:0.5, onComplete:()=>{dealAnimationBetPhase()}});
    }

    function dealAnimationBetPhase()
    {
        playerCard1.ShowFront(true);
        betButtonContainer.visible = true;
    }

    function betPlaced()
    {
        //console.log("bet placed");
        betButtonContainer.visible = false;

        playerCash -=cashPerBet;
        yourWalletText.text = "Your Cash: "+playerCash;

        if(lastResult.isQuickWin)
        {
            ShowAllCards();
            return;
        }

        let gotAThirdPlayerCard:boolean = false;
        let gotAThirdBankerCard:boolean = false;
        if(lastResult.playerHand.length == 3)
        {
            gotAThirdPlayerCard = true;
            playerCard3.visible = true;
            gsap.from(playerCard3, {y:-500, duration:0.5, onComplete:()=>{
                if(!gotAThirdBankerCard) ShowAllCards();
            }});
        }
        if(lastResult.bankerHand.length==3)
        {
            gotAThirdBankerCard=true;
            bankerCard3.visible = true;
            gsap.from(bankerCard3, {y:-500, duration:0.5, onComplete:()=>{
                ShowAllCards();
            }})           
        }
        if(!gotAThirdBankerCard && !gotAThirdPlayerCard)
        {
            ShowAllCards();
        }
    }

    function ShowAllCards()
    {
        playerCard1.ShowFront(true);
        playerCard2.ShowFront(true);
        if(lastResult.playerHand.length==3) playerCard3.ShowFront(true);

        bankerCard1.ShowFront(true);
        bankerCard2.ShowFront(true);
        if(lastResult.bankerHand.length==3) bankerCard3.ShowFront(true);

        playerTotalScoreText.visible = true;
        bankerTotalScoreText.visible = true;
        
        

        if(betPlacedOn == lastResult.winnings)
        {
            announceBox.changeTextWinning("You win 10 in cash!");
            lastWinnings = 10;
        }else
        {
            announceBox.changeTextWinning("Try again?");
            lastWinnings = 0;
        }
        announceBox.visible = true;

        playerCash += lastWinnings;
        yourWalletText.text = "Your Cash: "+playerCash;

        dealButton.visible = true;
    }
    

    function parseResults()
    {
        let results = baccMan.PlayAndGetResults();
        lastResult = results;
        //console.log(results);        
        //change the cards based on result
        playerCard1.changeCard(results.playerHand[0]);
        playerCard2.changeCard(results.playerHand[1]);
        if(results.playerHand.length==3) playerCard3.changeCard(results.playerHand[2]);

        bankerCard1.changeCard(results.bankerHand[0]);
        bankerCard2.changeCard(results.bankerHand[1]);
        if(results.bankerHand.length==3) bankerCard3.changeCard(results.bankerHand[2]);

        //change the scores based on result
        playerTotalScoreText.text = "Total Score: "+results.playerTotalScore;
        bankerTotalScoreText.text = "Total Score: "+results.bankerTotalScore;

        //update the announce box
        switch(results.winnings)
        {
            case 'P':
                    announceBox.changeTextBody("Player!");
                    
                break;
            case 'B':
                    announceBox.changeTextBody("Banker!")
                break;
            case "T":
                    announceBox.changeTextBody("Its a Tie!")
                break;
            default:
                //throw an error
                break;
        }

    }

    function buttonClicked(id:String)
    {
        switch(id){
            case 'deal':
                // dealButton.interactive = false;
                dealButton.visible = false;
                resetForDeal();
                parseResults();
                break;

            case 'bet_player':
                betPlacedOn = "P";
                youBetOnText.text = "You placed a bet on Player";
                youBetOnText.visible = true;
                betPlaced();
                break;
                
            case 'bet_banker':
                betPlacedOn="B";
                youBetOnText.text = "You placed a bet on Banker";
                youBetOnText.visible = true;
                betPlaced();
                break;
                
            case 'bet_tie':
                betPlacedOn = "T";
                youBetOnText.text = "You placed a bet on a Tie";
                youBetOnText.visible = true;
                betPlaced();
                break;
                
        }
    }

}