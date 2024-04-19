import { Container, Sprite, Text } from "pixi.js";

class CustomButton extends Container{
    bgSprite :Sprite;
    buttonText : Text;
    constructor()
    {
        super();
        this.bgSprite = Sprite.from("button_bg");
        this.buttonText = new Text({text: 'Hello button'});

        this.addChild(this.bgSprite);
        this.addChild(this.buttonText);
    }
}

export function getButton()
{
    const generatedButton = new CustomButton();

    return generatedButton;
}