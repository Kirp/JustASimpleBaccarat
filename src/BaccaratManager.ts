
class BaccaratManager {
    deck:string[];
    playerHand:string[];
    bankerHand:string[];
    playerTotalScore:number;
    bankerTotalScore:number;
    constructor(){
        this.deck = this.generateDefault52CardDeck();
        this.playerTotalScore = 0;
        this.playerHand = [];
        this.bankerTotalScore = 0;
        this.bankerHand = [];

    }
    generateDefault52CardDeck(){
        let suits = ['C', 'D', 'H','S'];
        let faces = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        let cards:string[] = [];
        for(let suitCtr  =  0; suitCtr<suits.length; suitCtr++)
        {
            for(let faceCtr = 0; faceCtr < faces.length; faceCtr++)
            {
                cards.push(`${suits[suitCtr]}_${faces[faceCtr]}`);
            }
        }
        return cards;
    }
    DealCardFromDeck(){
        let randomCardPosition = Math.floor(Math.random()*this.deck.length);
        let randomCard = this.deck[randomCardPosition];
        this.deck.splice(randomCardPosition,1);
        return randomCard;
    }
    DealToPlayer()
    {
        this.playerHand.push(this.DealCardFromDeck());
        this.playerTotalScore = this.ParseHandScore(this.playerHand);
    }
    DealToBanker()
    {
        this.bankerHand.push(this.DealCardFromDeck());
        this.bankerTotalScore = this.ParseHandScore(this.bankerHand);
    }
    ParseCardScore(card:string)
    {
        let splitter = card.split("_");
        let face = splitter[1];
        switch (face)
        {
            case 'J':
                return 0;
            case 'Q':
                return 0;
            case 'K':
                return 0;
            case 'A':
                return 1;
            default:
                return parseInt(face);
        }
    }
    ParseHandScore(cardHand:string[])
    {
        let totalScore = 0;
        for(let card of cardHand)
        {
            totalScore += this.ParseCardScore(card);
        }
        return totalScore%10;
    }
    PlayAndGetResults()
    {
        for(let i=0; i<2; i++)
        {
            this.DealToPlayer();
            this.DealToBanker();
        }

        //check for score of 8-9 to go for auto finalize
        if(this.playerTotalScore<=8 || this.bankerTotalScore<=8)
        {
            //finalize!
        }else
        {

            //check if player gets third card
            if(this.playerTotalScore<=5)
            {
                this.DealToPlayer();
            }

            //check if banker gets third card
            if(this.playerHand.length == 2)
            {
                if(this.bankerTotalScore<=5)
                {
                    this.DealToBanker();
                }
            }else {
                let playerThirdCardScore = this.ParseCardScore(this.playerHand[this.playerHand.length-1]);
                switch(this.bankerTotalScore)
                {
                    case 0:
                    case 1:
                    case 2:
                        this.DealToBanker();
                        break;
                    case 3:
                        if(playerThirdCardScore!=8) this.DealToBanker();
                        break;
                    case 4:
                        if(playerThirdCardScore>=2 &&playerThirdCardScore<=7) this.DealToBanker();
                        break;
                    case 5:
                        if(playerThirdCardScore>=4 &&playerThirdCardScore<=7) this.DealToBanker();
                        break;
                    case 6:
                        if(playerThirdCardScore==6  || playerThirdCardScore==7) this.DealToBanker();
                        break;
                    default:
                        //stand
                        break;
                }
            }
        }

        //final results
        // console.log(this.playerHand);
        // console.log(this.playerTotalScore);
        // console.log(this.bankerHand);
        // console.log(this.bankerTotalScore);
        let winner;

        if(this.playerTotalScore == this.bankerTotalScore)
        {
            // console.log("tie!");
            winner = 'T';
        }else
        {
            if(this.playerTotalScore>this.bankerTotalScore)
            {
                // console.log("player wins");
                winner = 'P';
            }else
            {
                // console.log("banker wins!")
                winner = "B";
            }
        }


        return [ 
            this.playerHand,
            this.playerTotalScore,
            this.bankerHand,
            this.bankerTotalScore,
            winner
        ]

        
    }
}

const carder = new BaccaratManager();
let result = carder.PlayAndGetResults();
console.log(result);



