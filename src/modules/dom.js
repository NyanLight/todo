import { createProject, deleteProject } from "./controller";
import { projects } from "./projects";
import binIcon from '../assets/rubbish-bin-svgrepo-com.svg';

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
        li.classList.toggle('projectLi');
        const div = document.createElement('div');
        const span = document.createElement('span');
        const bin = document.createElement('img');
        div.classList.toggle('projectDiv');
        span.classList.toggle('projectSpan');
        span.textContent = project.name;
        bin.src = binIcon;
        bin.classList.toggle('noneBin');
        bin.addEventListener('click', () => {
            deleteProject(span.textContent);
            displayProjects();
        })
        li.appendChild(div);
        div.appendChild(span);
        div.appendChild(bin);
        list.appendChild(li);
        li.addEventListener('mouseover', () => {
            bin.classList.toggle('Bin');
        })
        li.addEventListener('mouseout', () => {
            bin.classList.toggle('Bin');
        })
    }   
}