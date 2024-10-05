import {
  createProject,
  createTask,
  deleteProject,
  deleteTask,
  getProjectIndex,
  switchCompletion,
} from "./controller";
import { projects } from "./projects";
import binIcon from "../assets/rubbish-bin-svgrepo-com.svg";
import checkIcon from '../assets/check-square-svgrepo-com.svg';

const addProjectBtn = document.querySelector("#addProjectBtn");
addProjectBtn.addEventListener("click", () => {
  const projectNameInput = document.querySelector("#projectNameInput");
  createProject(`${projectNameInput.value}`);
  projectNameInput.value = "";
  displayProjects();
});

const openDialogBtn = document.getElementById("openDialogBtn");
const dialog = document.getElementById("dialog");
openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

const addTaskBtn = document.getElementById("addTaskBtn");
addTaskBtn.addEventListener("click", () => {
  const project = document.getElementById("projectInput").value;
  const title = document.getElementById("titleInput").value;
  const description = document.getElementById("descriptionInput").value;
  const dueDate = document.getElementById("dateInput").value;
  const priority = document.getElementById("priorityInput").value;
  createTask(project, title, description, dueDate, priority);
  dialog.close();
  displayProject(project);
});

export function displayProject(projectName) {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML = "";
  const index = getProjectIndex(projectName);
  const currentProject = document.getElementById("currentProject");
  currentProject.textContent = projects[index].name;
  for (const task of projects[index].tasks) {
    const li = document.createElement("li");
    const title = document.createElement("div");
    const description = document.createElement("div");
    const dueDate = document.createElement("div");
    const priority = document.createElement("div");
    const bin = document.createElement('img');
    const check = document.createElement('img');
    li.classList.toggle("taskLi");
    title.classList.toggle("titleDiv");
    description.classList.toggle("descriptionDiv");
    dueDate.classList.toggle("dueDateDiv");
    priority.classList.toggle("priorityDiv");
    bin.classList.toggle('bin');
    check.classList.toggle('check');
    bin.src = binIcon;
    check.src = checkIcon;
    title.textContent = task.title;
    description.textContent = task.description;
    dueDate.textContent = task.dueDate;
    priority.textContent = task.priority;
    bin.addEventListener('click', () => {
      deleteTask(projects[index].name, title.textContent);
      displayProject(projects[index].name);
    })
    check.addEventListener('click', () => {
      switchCompletion(projects[index].name, title.textContent);
      console.log(projects);
    })
    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(dueDate);
    li.appendChild(priority);
    li.appendChild(bin);
    li.appendChild(check);
    tasksList.appendChild(li);
  }
}
 
export function displayProjects() {
  const list = document.querySelector("#projectsList");
  list.innerHTML = "";
  for (const project of projects) {
    const li = document.createElement("li");
    li.classList.toggle("projectLi");
    const div = document.createElement("div");
    const span = document.createElement("span");
    div.classList.toggle("projectDiv");
    span.classList.toggle("projectSpan");
    span.textContent = project.name;
    span.addEventListener("click", () => {
      displayProject(span.textContent);
    });
    li.appendChild(div);
    div.appendChild(span);
    list.appendChild(li);
    if (span.textContent !== "Default") {
      const bin = document.createElement("img");
      bin.src = binIcon;
      bin.classList.toggle("noneBin");
      bin.addEventListener("click", () => {
        deleteProject(span.textContent);
        displayProjects();
      });
      li.addEventListener("mouseover", () => {
        bin.classList.toggle("bin");
      });
      li.addEventListener("mouseout", () => {
        bin.classList.toggle("bin");
      });
      div.appendChild(bin);
    }
  }
}
