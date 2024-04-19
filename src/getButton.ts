import { Container, Sprite, Text } from "pixi.js";

class CustomButton extends Container{
    bgSprite :Sprite;
    buttonText : Text;
    constructor(showText:string = "default")
    {
        super();
        this.bgSprite = Sprite.from("button_bg");
        this.bgSprite.anchor.set(0.5);
        this.buttonText = new Text({text: showText});
        this.buttonText.anchor.set(0.5);

        this.addChild(this.bgSprite);
        this.addChild(this.buttonText);
    }
}

export function getButton()
{
    const generatedButton = new CustomButton();

    return generatedButton;
}