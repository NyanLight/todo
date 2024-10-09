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
import checkIcon from "../assets/check-square-svgrepo-com.svg";

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
  projectInput.value = currentProject.textContent;
  titleInput.value = '';
  descriptionTextarea.value = '';
  dueDateInput.value = '';
  priorityInput.value = '';
  addTaskBtn.classList.remove('hidden');
  dialog.showModal();
});

const projectInput = document.getElementById("projectInput");
const titleInput = document.getElementById("titleInput");
const descriptionTextarea = document.getElementById("descriptionTextarea");
const dueDateInput = document.getElementById("dateInput");
const priorityInput = document.getElementById("priorityInput");
const addTaskBtn = document.getElementById("addTaskBtn");
addTaskBtn.addEventListener("click", () => {
  const project = projectInput.value;
  const title = titleInput.value;
  const description = descriptionTextarea.value;
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;
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
    const priority = document.createElement("div");
    const bin = document.createElement("img");
    const check = document.createElement("img");
    li.classList.toggle("taskLi");
    title.classList.toggle("titleDiv");
    priority.classList.toggle("priorityDiv");
    bin.classList.toggle("bin");
    check.classList.toggle("check");
    bin.src = binIcon;
    check.src = checkIcon;
    title.textContent = task.title;
    priority.textContent = task.priority;
    bin.addEventListener("click", (e) => {
      e.stopPropagation()
      deleteTask(projects[index].name, title.textContent);
      displayProject(projects[index].name);
    });
    check.addEventListener("click", (e) => {
      e.stopPropagation()
      switchCompletion(projects[index].name, title.textContent);
      console.log(projects);
    });
    li.appendChild(title);
    li.appendChild(priority);
    li.appendChild(bin);
    li.appendChild(check);
    tasksList.appendChild(li);
    li.addEventListener('click', () => {
      projectInput.value = projectName;
      titleInput.value = task.title;
      descriptionTextarea.value = task.description;
      dueDateInput.value = task.dueDate;
      priorityInput.value = task.priority;
      addTaskBtn.classList.add('hidden');
      dialog.showModal();
    })
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
      bin.classList.toggle("hidden");
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
