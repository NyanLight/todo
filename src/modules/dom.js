import { projects } from "./projects";

export function displayProjects() {
    const list = document.querySelector('#projectsList')
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