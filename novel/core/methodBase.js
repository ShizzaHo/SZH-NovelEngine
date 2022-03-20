//#region 
let SelectedScene;

let State = {
    wait: 'wait',
    execution: 'execution',
    paused: 'paused',
};

let _scenarioList = [];
let _scenarioPosition = 0;
let _scenarioSpecialInterval;

//#region 
let textSpeed = 100;
//#region 

//#endregion

class Say{
    character;
    text;

    constructor(character, text){
        this.character = character;
        this.text = text;
    }

    start(){
        SelectedScene.scenarioState = State.execution;

        let textArray = this.text.split("");
        let textLength = textArray.length;
        let count = 0;

        SelectedScene.characterName.innerHTML = this.character.name;
        SelectedScene.characterName.style = "color: "+this.character.nameColor;
        SelectedScene.dialogText.innerHTML = null;

        _scenarioSpecialInterval = setInterval(function() {
            if(count < textLength){
                SelectedScene.dialogText.innerHTML += textArray[count];
                count++;
            } else {
                clearInterval(_scenarioSpecialInterval);
                SelectedScene.scenarioState = State.wait;
                _scenarioPosition++;
            }
        },textSpeed);
    }

    skip(){
        clearInterval(_scenarioSpecialInterval);
        SelectedScene.scenarioState = State.wait;
        SelectedScene.dialogText.innerHTML = this.text;
        _scenarioPosition++;
    }
}

//#endregion

//#endregion

class Scene {
    scenarioState = State.wait;
    scenarioPosition = 0;

    /* === */ 

    characterName = document.getElementById("characterName");
    dialogText = document.getElementById("dialogText");
}

class Character {
    name;
    nameColor;

    constructor(name, color){
        this.name = name;
        this.nameColor = color;
    }

    say(text){
        _scenarioList.push(new Say(this, text));
    }
}

//#region 

function scenarioNext() {
    switch (SelectedScene.scenarioState) {
        case State.wait:
            _scenarioList[_scenarioPosition].start();
            break;
        case State.execution:
            _scenarioList[_scenarioPosition].skip();
            break;
        default:
            break;
    }
}

//#endregion