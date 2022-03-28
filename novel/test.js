SelectedScene = new Scene();
let person = new Character("Персонаж","green","res/Hana/");
let music = new Audio("res/bg.mp3", 0.2);

function onStart(){
    SelectedScene.edit("textSpeed","10");
    SelectedScene.setBackground("res/bg/Cafeteria_Day.png", "fade");
    person.setSprite("Hana_Maid_EyesClosed_Open_Blush");
    //person.spriteSettings("animationEffect", "characterFade");
    person.spriteSettings("miror", true);
    person.say("Персонажер 1");
    person.setSprite("Hana_Maid_EyesClosed_Open");
    person.spriteSettings("width", "120vw");
    person.spriteSettings("miror", false);
    person.say("Персонажер 2");
}