import { createProject } from "./controller";
import { projects } from "./projects";

const addProjectBtn = document.querySelector('#addProjectBtn');
addProjectBtn.addEventListener('click', () => {
    const projectNameInput = document.querySelector('#projectNameInput');
    createProject(`${projectNameInput.value}`);
    projectNameInput.value = '';
    displayProjects();
}) 

export function displayProjects() {
    const list = document.querySelector('#projectsList')
    list.innerHTML = '';
    for (const project of projects) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const span = document.createElement('span');
        div.classList.toggle('projectDiv');
        span.classList.toString('projectSpan');
        span.textContent = project.name;
        li.appendChild(div);
        div.appendChild(span);
        list.appendChild(li);
    }
}