SelectedScene = new Scene();
let zakadr = new Character("Имя","");

function onStart(){
    SelectedScene.edit("textSpeed","10");
    SelectedScene.setBackground("res/bg/Cafeteria_Day.png", "roll");
    zakadr.say("Анимация 1");
    SelectedScene.setBackground("res/bg/City_Night.png", "tilt");
    zakadr.say("Анимация 2");
    SelectedScene.setBackground("res/bg/School_Hallway_Day.png", "fade");
    zakadr.say("Анимация 3");
    SelectedScene.setBackground("res/bg/Street_Summer_Day.png", "flipScale");
    zakadr.say("Анимация 4");
}