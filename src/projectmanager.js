const ProjectList = {
    home: [],
    work: [],
    study: []
};

function newProject(projectname) {
    if (!ProjectList[projectname]) {
        ProjectList[projectname] = [];
    }
}

function addTaskToProject(projectName, task) {
    if (ProjectList[projectName]) {
        ProjectList[projectName].push(task);
    }
}

export { ProjectList, newProject, addTaskToProject };
