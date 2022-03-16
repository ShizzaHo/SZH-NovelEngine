let fs = require('fs');
/* ===================== */

//#region Engine variables
const engineConfigPath = process.env.APPDATA + "/NovelEngine_config"
let config = JSON.parse(fs.readFileSync(engineConfigPath+"/engineConfig.json", 'utf8'));
let modulesFolder = config.workDir+"/engineModules/";
let localizationData;
//#endregion

//#region Editor variables
let selectedProjectName;
const engineVersion = "1.0";
//#endregion

//#region Engine modules
const projectManager = require(modulesFolder+"/ProjectManagerModule/moduleMaster"); // Module for working with projects
//#endregion

/* ===================== */

window.onload = function(){
    setLocalization();
    addProjectsToMenu(projectManager.getProjectsList());
};

function addProjectsToMenu(projectList) {
    const list = document.getElementById("projectList");
    list.innerHTML = null;
    for (let i = 0; i < projectList.length; i++) {
        const projectName = projectList[i];
        list.innerHTML += `<ul>`+projectName+`</ul>`
    }
}

function createNewProject() {
    let randomNumber = Math.floor(Math.random() * (1000 - 0));
    let projectName = localizationData.defaultName + " " + randomNumber;

    if(!fs.existsSync(config.workDir+"/projects/"+projectName)){
        projectManager.createProject(projectName);
        let manifest = projectManager.getManifest(projectName);
        manifest.name = projectName;
        manifest.version = "1.0.0";
        manifest.engineVersion = engineVersion;
        projectManager.saveManifest(projectName, manifest);
    } else {
        createNewProject();
    }

    addProjectsToMenu(projectManager.getProjectsList());
    document.getElementById("workspace").style = "display: block;"
    document.getElementById("selector").style = "display: none;"
    selectedProjectName = projectName;
    loadProjectInfo(projectName);
}

function setLocalization() {
    switch (config.lang) {
        case "english":
            localizationData = JSON.parse(fs.readFileSync(config.workDir+"/localization/english.json", 'utf8'));
            break;
        case "russian":
            localizationData = JSON.parse(fs.readFileSync(config.workDir+"/localization/russian.json", 'utf8'));
            break;
        default:
            break;
    }

    let names = Object.keys(localizationData);
    let endLocal = false;

    for (let i = 0; i < names.length; i++) {
        const word = localizationData[names[i]];

        if(names[i] == "___endUILocals"){
            endLocal = true;
        } else if (names[i] != "_comment" && endLocal == false) {
            document.getElementById(names[i]).innerText = word;
        }
    }
}

function selectProject(e) {
    selectedProjectName = e.target.innerText;
    if(projectManager.isProject(selectedProjectName)){
        document.getElementById("workspace").style = "display: block;"
        document.getElementById("selector").style = "display: none;"
        loadProjectInfo(selectedProjectName);
    } else {
        alert(localizationData.projectOpenError.replace("*",config.workDir+"/projects/"+selectedProjectName))
    }
}

function loadProjectInfo(name) {
    let manifestData = projectManager.getManifest(name);
    let projectName = document.getElementById("projectName");

    projectName.innerText = manifestData.name;
}

function removeProject(e){
    e.preventDefault();
    if(e.button == 0){
        alert(localizationData.projectDeleteDialog);
    } else if(e.button == 2){
        
        document.getElementById("workspace").style = "display: none;"
        document.getElementById("selector").style = "display: flex;"

        projectManager.removeProject(selectedProjectName);
        selectedProjectName = null;
        addProjectsToMenu(projectManager.getProjectsList());

    }
}