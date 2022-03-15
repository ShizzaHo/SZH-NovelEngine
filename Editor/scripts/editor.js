let fs = require('fs');

/* ===================== */

//#region Engine variables
const engineConfigPath = process.env.APPDATA + "/NovelEngine_config"
let config = JSON.parse(fs.readFileSync(engineConfigPath+"/engineConfig.json", 'utf8'));
let modulesFolder = config.workDir+"/engineModules/";
//#endregion

//#region Editor variables
let selectedProjectName;
//#endregion

//#region Engine modules
const projectManager = require(modulesFolder+"/ProjectManagerModule/moduleMaster"); // Module for working with projects
//#endregion

/* ===================== */

window.onload = function(){
    addProjectsToMenu(projectManager.getProjectsList());
};

function addProjectsToMenu(projectList) {
    const list = document.getElementById("projectList");
    for (let i = 0; i < projectList.length; i++) {
        const projectName = projectList[i];
        alert(projectName);
        list.innerHTML += `<ul>`+projectName+`</ul>`
    }
}
