SelectedScene = new Scene();
let person = new Character("Персонаж","green","res/Hana/");
let music = new Audio("res/bg.mp3", 0.2);

function onStart(){
    SelectedScene.edit("textSpeed","10");
    SelectedScene.setBackground("res/bg/Cafeteria_Day.png", "fade");
    person.setSprite("Hana_Maid_EyesClosed_Open_Blush");
    person.say("Персонажер");
}