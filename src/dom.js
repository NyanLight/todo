import { todoController, projects } from "./todos";

const projectsUl = document.getElementById("projects");
const todosUl = document.getElementById("todos");
const addProjectBtn = document.getElementById("addProjectBtn");
const projectNameInput = document.getElementById("projectNameInput");
const warning = document.getElementById("warning");
const projectTitle = document.getElementById("projectTitle");

export const domController = {
  displayProjects() {
    projectsUl.innerHTML = "";
    const projects = todoController.getProjectsNames();
    for (let i = 0; i < projects.length; ++i) {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("projectDiv");
      const project = document.createElement("li");
      project.textContent = projects[i];
      project.classList.add("project");
        project.addEventListener("click", () => {
          domController.displayTodo(project.textContent);
          projectTitle.textContent = project.textContent;
        });
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "del";
      deleteBtn.dataset.name = projects[i];
      deleteBtn.addEventListener("click", () => {
        domController.deleteProject(deleteBtn.dataset.name);
      });
      projectDiv.appendChild(project);
      projectDiv.appendChild(deleteBtn);
      projectsUl.appendChild(projectDiv);
    }
  },

  displayAllTodos() {
    for (const project in projects) {
      projects[project].forEach((todo) => {
        const liTodo = document.createElement("li");
        liTodo.textContent = `${todo.title} ${todo.description} ${todo.dueDate} ${todo.priority}`;
        todosUl.appendChild(liTodo);
      });
    }
  },

  displayTodo(projectName) {
    projects[projectName].forEach((todo) => {
      const liTodo = document.createElement("li");
      liTodo.textContent = `${todo.title} ${todo.description} ${todo.dueDate} ${todo.priority}`;
      todosUl.innerHTML = "";
      todosUl.appendChild(liTodo);
    });
  },

  addWarningSign() {
    warning.textContent =
      "There are already 5 projects here. Delete a project to add the new one.";
  },

  addProject(projectName) {
    if (todoController.createProject(projectName) === false)
      domController.addWarningSign();
    domController.displayProjects();
  },

  deleteProject(projectName) {
    todoController.deleteProject(projectName);
    domController.displayProjects();
    warning.textContent = "";
  },
};

addProjectBtn.addEventListener("click", () => {
  if (domController.addProject(projectNameInput.value) == false)
    domController.addWarningSign();
  domController.addProject(projectNameInput.value);
  projectNameInput.value = "";
});
