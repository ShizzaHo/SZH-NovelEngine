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
            case "sprite":
                this.character.spriteElement.src = this.change;
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
            case "animationSpeed":
                document.documentElement.style.setProperty("--animationTimes", this.change+"ms");
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
class SetBackground{
    path;
    anim;

    constructor(path, anim){
        this.path = path;
        this.anim = anim;
    }

    start(){
        SelectedScene.scenarioState = State.execution;

        let newBg = document.getElementById("bgNew");
        let oldBg = document.getElementById("bgOld");
        let oldest = document.documentElement.style.getPropertyValue("--backgroundScene");
        let activeNew;
        let activeOld;
        let animationTime = document.documentElement.style.getPropertyValue("--animationTimes").replace(/[^0-9]/g,"")
        
        document.documentElement.style.setProperty("--backgroundSceneOld", ""+oldest+"");
        document.documentElement.style.setProperty("--backgroundScene", "url("+this.path+")");

        switch (this.anim) {
            case "roll":
                activeNew = "roll";
                activeOld = "roll2";
                break;
            case "tilt":
                activeNew = "tilt";
                break;
            case "fade":
                activeNew = "fadeIn";
                activeOld = "fandeOut";
                break;
            case "flipScale":
                activeNew = "flipScale";
                break;
            default:
                break;
        }

        newBg.classList.add(activeNew);
        oldBg.classList.add(activeOld);

        setTimeout(() =>{
            newBg.classList.remove(activeNew);
            oldBg.classList.remove(activeOld);
        },animationTime);

        SelectedScene.scenarioState = State.wait;
        _scenarioPosition++;
        scenarioNext();
    }
}

class AudioRes{
    audio;
    method;

    constructor(audio, method){
        this.audio = audio;
        this.method = method;
    }

    start(){
        SelectedScene.scenarioState = State.execution;

        switch (this.method) {
            case "play":
                this.audio.audioObject.src = this.audio.path;
                this.audio.audioObject.volume = this.audio.volume;
                this.audio.audioObject.play();
                break;
            case "pause":
                this.audio.audioObject.pause();
                break;
            default:
                break;
        }

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

    setBackground(path){
        _scenarioList.push(new SetBackground(path, "none"));
    }

    setBackground(path, anim){
        _scenarioList.push(new SetBackground(path, anim));
    }
}

class Character {
    name;
    nameColor;

    spriteFolder;
    spriteElement;
    spriteElement;
    spriteElementID;

    constructor(name, color, spriteFolder){
        this.name = name;
        this.nameColor = color;
        this.spriteFolder = spriteFolder;
        this.spriteElementID = "SPRITE_" + Math.random() * (1000 - 0);

        let sprite = document.createElement("img");
        sprite.id = this.spriteElementID;
        sprite.classList.add("defaultSprite");
        document.getElementById("scenarioElements").appendChild(sprite);
        this.spriteElement = document.getElementById(this.spriteElementID);
    }

    say(text){
        _scenarioList.push(new Say(this, text));
    }

    edit(type, change){
        _scenarioList.push(new EditCharacter(this, type, change));
    }

    setSprite(name, special){
        if(special == "undefined"){
            _scenarioList.push(new EditCharacter(this, "sprite", this.spriteFolder+"/"+name+"."+special));
        } else {
            _scenarioList.push(new EditCharacter(this, "sprite", this.spriteFolder+"/"+name+".png"));
        }
    }

    spriteSettings(type, change){
        if(special == "undefined"){
            _scenarioList.push(new EditCharacter(this, "sprite", this.spriteFolder+"/"+name+"."+special));
        } else {
            _scenarioList.push(new EditCharacter(this, "sprite", this.spriteFolder+"/"+name+".png"));
        }
    }
}

class Audio {
    path;
    audioID;
    audioObject;
    volume;

    constructor(path, volume){
        this.path = path;
        this.audioID = "AUDIO_" + Math.random() * (1000 - 0);
        this.volume = volume;
        let aud = document.createElement("audio");
        aud.id= this.audioID;
        document.body.appendChild(aud);
        this.audioObject = document.getElementById(this.audioID);
    }

    play(){
        _scenarioList.push(new AudioRes(this,"play"));
    }

    pause(){
        _scenarioList.push(new AudioRes(this,"pause"));
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

window.onload = () => { 
    document.documentElement.style.setProperty("--animationTimes", "1000ms");
    _scenarioPosition++;
    scenarioNext() 
}