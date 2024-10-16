import {
  changeProject,
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
import { format } from "date-fns";

const projectsSelect = document.getElementById("projectsSelect");
function updateProjectSelect() {
  projectsSelect.innerHTML = "";
  for (const project of projects) {
    const option = document.createElement("option");
    option.innerText = project.name;
    option.value = project.name;
    projectsSelect.appendChild(option);
  }
}

const crossImg = document.getElementById("crossImg");
crossImg.addEventListener("click", () => {
  dialog.close();
});

const addProjectBtn = document.querySelector("#addProjectBtn");
addProjectBtn.addEventListener("click", () => {
  const projectNameInput = document.querySelector("#projectNameInput");
  createProject(`${projectNameInput.value}`);
  projectNameInput.value = "";
  displayProjects();
  updateProjectSelect();
});

const openDialogBtn = document.getElementById("openDialogBtn");
const dialog = document.getElementById("dialog");
openDialogBtn.addEventListener("click", () => {
  projectsSelect.value = currentProject.textContent;
  titleInput.value = "";
  descriptionTextarea.value = "";
  dueDateInput.valueAsDate = new Date();
  prioritySelect.value = "medium";
  addTaskBtn.classList.remove("hidden");
  saveChangesBtn.classList.add("hidden");
  dialog.showModal();
});

const titleInput = document.getElementById("titleInput");
const descriptionTextarea = document.getElementById("descriptionTextarea");
const dueDateInput = document.getElementById("dateInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
addTaskBtn.addEventListener("click", () => {
  const project = projectsSelect.options[projectsSelect.selectedIndex].value;
  const title = titleInput.value;
  const description = descriptionTextarea.value;
  const dueDate = new Date(dueDateInput.value);
  const priority = prioritySelect.value;
  createTask(project, title, description, dueDate, priority);
  dialog.close();
  displayProject(project);
});

const saveChangesBtn = document.getElementById("saveChangesBtn");
export function displayProject(projectName) {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML = "";
  const index = getProjectIndex(projectName);
  const currentProject = document.getElementById("currentProject");
  currentProject.textContent = projects[index].name;
  displayTasks(index);
}

function displayTasks(index) {
  for (const task of projects[index].tasks) {
    if (task.complete === true) continue;
    updateProjectSelect();
    const li = document.createElement("li");
    const title = document.createElement("div");
    const dueDate = document.createElement("div");
    const bin = document.createElement("img");
    const check = document.createElement("img");
    li.classList.toggle("taskLi");
    title.classList.toggle("titleDiv");
    dueDate.classList.toggle("dueDateDiv");
    bin.classList.toggle("bin");
    bin.classList.toggle("taskLiBin");
    check.classList.toggle("check");
    bin.src = binIcon;
    check.src = checkIcon;
    title.textContent = task.title;
    console.log(task.dueDate);
    if (task.dueDate) dueDate.innerText = format(task.dueDate, "dd/MM/yy");
    bin.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(projects[index].name, title.textContent);
      displayProject(projects[index].name);
    });
    check.addEventListener("click", (e) => {
      e.stopPropagation();
      switchCompletion(projects[index].name, title.textContent);
      displayProject(currentProject.textContent);
      console.log(projects);
    });
    li.appendChild(check);
    li.appendChild(title);
    li.appendChild(dueDate);
    li.appendChild(bin);
    tasksList.appendChild(li);
    li.addEventListener("click", () => {
      projectsSelect.value = currentProject.textContent;
      titleInput.value = task.title;
      descriptionTextarea.value = task.description;
      dueDateInput.value = task.dueDate;
      prioritySelect.value = task.priority;
      addTaskBtn.classList.add("hidden");
      saveChangesBtn.classList.remove("hidden");
      saveChangesBtn.addEventListener(
        "click",
        () => {
          changeProject(
            currentProject.textContent,
            task.title,
            projectsSelect.value
          );
          task.changeTitle(titleInput.value);
          task.changeDescription(descriptionTextarea.value);
          task.changeDueDate(dueDateInput.value);
          task.changePriority(prioritySelect.value);
          displayProject(currentProject.textContent);
          dialog.close();
        },
        { once: true }
      );
      dialog.showModal();
    });
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
        if (span.textContent == currentProject.textContent)
          displayProject("Default");
        updateProjectSelect();
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
