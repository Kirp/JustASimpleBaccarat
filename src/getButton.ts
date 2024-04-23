import { Container, Sprite, Text } from "pixi.js";

class CustomButton extends Container{
    buttonId:string;
    bgSprite :Sprite;
    buttonText : Text;
    constructor(buttonId:string, showText:string = "default", callback:Function)
    {
        super();
        this.buttonId = buttonId;
        this.bgSprite = Sprite.from("button_bg");
        this.bgSprite.anchor.set(0.5);
        this.buttonText = new Text({text: showText});
        this.buttonText.anchor.set(0.5);

        this.bgSprite.interactive = true;
        this.bgSprite.eventMode = 'static';
        this.bgSprite.on('pointerdown', ()=>{callback(this.buttonId);});
        this.bgSprite.cursor = 'pointer';

        this.addChild(this.bgSprite);
        this.addChild(this.buttonText);
    }

    setInteractivity(toggle:boolean)
    {
        this.bgSprite.interactive = toggle;
    }
}

export function getButton(buttonId:string = "default", newButtonText:string = "default", callback:Function)
{
    const generatedButton = new CustomButton(buttonId, newButtonText, callback);

    return generatedButton;
}