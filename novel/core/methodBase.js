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
let textSpeed = 10;
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

class EditCharacter{
    character;
    type;
    change;

    constructor(character, type, change){
        this.character = character;
        this.type = type;
        this.change = change;
    }

    start(){
        SelectedScene.scenarioState = State.execution;
        
        switch (this.type) {
            case "nameColor":
                this.character.nameColor = this.change;
                break;
            case "name":
                this.character.name = this.change;
                break;
            default:
                break;
        }

        SelectedScene.scenarioState = State.wait;
        _scenarioPosition++;
        scenarioNext();
    }
}

class EditScene{
    scene;
    type;
    change;

    constructor(scene, type, change){
        this.scene = scene;
        this.type = type;
        this.change = change;
    }

    start(){
        SelectedScene.scenarioState = State.execution;
        
        switch (this.type) {
            case "textSpeed":
                textSpeed = this.change;
                break;
            default:
                break;
        }

        SelectedScene.scenarioState = State.wait;
        _scenarioPosition++;
        scenarioNext();
    }
}

class RunMethod{
    func;

    constructor(func){
        this.func = func;
    }

    start(){
        SelectedScene.scenarioState = State.execution;
        
        this.func()

        SelectedScene.scenarioState = State.wait;
        _scenarioPosition++;
        scenarioNext();
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

    runMethod(func){
        _scenarioList.push(new RunMethod(func));
    }

    edit(type, change){
        _scenarioList.push(new EditScene(this, type, change));
    }
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

    edit(type, change){
        _scenarioList.push(new EditCharacter(this, type, change));
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