SelectedScene = new Scene();
let zakadr = new Character("Имя","");
let music = new Audio("res/bg.mp3", 0.2);

function onStart(){
    SelectedScene.edit("textSpeed","10");
    SelectedScene.setBackground("res/bg/Cafeteria_Day.png", "fade");
    zakadr.say("Анимация 1");
    SelectedScene.setBackground("res/bg/City_Night.png", "roll");
    music.play();
    zakadr.say("Анимация 2");
    SelectedScene.setBackground("res/bg/School_Hallway_Day.png", "fade");
    music.pause();
    zakadr.say("Анимация 3 ФЕЙД");
    SelectedScene.setBackground("res/bg/Street_Summer_Day.png", "flipScale");
    zakadr.say("Анимация 4");
}