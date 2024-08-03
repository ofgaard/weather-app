import { ProjectList, newProject, addTaskToProject } from './projectmanager.js';


export function renderProjectList() {
    const projectKeys = Object.keys(ProjectList);
    const domProjectList = document.querySelector('.projects');

    projectKeys.forEach((key) => {
        const p = document.createElement('button');
        p.textContent = '# ' + key;
        p.classList.add('project');
        domProjectList.appendChild(p);
    });


};
