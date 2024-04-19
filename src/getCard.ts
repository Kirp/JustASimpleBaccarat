import { Container, Sprite } from "pixi.js";

class CardObject extends Container
{
    cardBack : Sprite;
    cardFront : Sprite;
    constructor()
    {
        super();
        this.cardBack = Sprite.from("card_back");
        this.cardFront = Sprite.from("C_A");

        this.addChild(this.cardBack);
        this.addChild(this.cardFront);
    }

    changeCard(toCard:string)
    {

    }

    ShowFront(flag:boolean)
    {

    }
}

export function getCard()
{
    const generatedCard = new CardObject();
    return generatedCard;
}