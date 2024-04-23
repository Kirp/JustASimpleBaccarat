import { Container, Sprite, Text } from "pixi.js";

class AnnounceBox extends Container
{
    bgSprite : Sprite;
    titleText : Text;
    bodyText : Text;
    winningsText : Text;
    constructor()
    {
        super();
        this.bgSprite = Sprite.from("announce_bg");
        this.bgSprite.anchor.set(0.5);
        this.bgSprite.scale.set(3);
        this.titleText = new Text({text:"And the winner is..."});
        this.titleText.anchor.set(0.5);
        this.titleText.y -= 100;
        this.bodyText = new Text({text:"Body text!"});
        this.bodyText.anchor.set(0.5)
        this.winningsText = new Text({text: "bottom winning text!"});
        this.winningsText.anchor.set(0.5);
        this.winningsText.y +=100;

        this.addChild(this.bgSprite);
        this.addChild(this.titleText);
        this.addChild(this.bodyText);
        this.addChild(this.winningsText);
    }

    changeTextVisibility(top:boolean = true, body:boolean = true, bot:boolean = true)
    {
        this.titleText.visible = top;
        this.bodyText.visible = body;
        this.winningsText.visible = bot;
    }

    changeTextTitle(newText:string)
    {
        this.titleText.text = newText;
    }
    
    changeTextBody(newText:string)
    {
        this.bodyText.text = newText;
    }
    
    changeTextWinning(newText:string)
    {
        this.winningsText.text = newText;
    }


}

export function getAnnounceBox()
{
    const generatedAnnounceBox = new AnnounceBox();
    return generatedAnnounceBox;
}