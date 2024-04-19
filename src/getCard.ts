import { Container, Sprite, Assets } from "pixi.js";

class CardObject extends Container
{
    cardBack : Sprite;
    cardFront : Sprite;
    constructor()
    {
        super();
        this.cardBack = Sprite.from("card_back");
        this.cardBack.anchor.set(0.5);
        this.cardFront = Sprite.from("C_A");
        this.cardFront.anchor.set(0.5);

        this.addChild(this.cardBack);
        this.addChild(this.cardFront);
    }

    changeCard(toCard:string)
    {
        this.cardFront.texture = Assets.get(toCard);
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