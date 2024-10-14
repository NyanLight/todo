import { displayProject, displayProjects } from "./dom";
import { Project } from "./projects";
import { projects } from "./projects";
import { Task } from "./tasks";

export function getProjectIndex(name) {
  let index = null;
  for (const i in projects) {
    if (projects[i].name === name) {
      index = i;
      return index;
    } else {
      continue;
    }
  }
}

function getTaskIndex(projectIndex, title) {
  let index = null;
  for (const i in projects[projectIndex].tasks) {
    if (projects[projectIndex].tasks[i].title === title) {
      index = i;
      return index;
    } else {
      continue;
    }
  }
}

export function createProject(name) {
  if (projects.length === 5) {
    alert("Delete a project or more to create another one");
  } else {
    for (const project of projects) {
      if (name === project.name || name === '') {
        alert("Please, choose different name for your project.");
        return;
      } else {
        continue;
      }
    }
    projects.push(new Project(name));
  }
}

export function deleteProject(name) {
  const index = getProjectIndex(name);
  if (index === null) return;
  projects.splice(index, 1);
  console.log(projects);
}

export function createTask(projectName, title, description, dueDate, priority) {
  const index = getProjectIndex(projectName);
  if (index === null) return;
  projects[index].tasks.push(new Task(title, description, dueDate, priority));
}

export function deleteTask(projectName, taskTitle) {
  const projectIndex = getProjectIndex(projectName);
  if (projectIndex === null) return;
  const taskIndex = getTaskIndex(projectIndex, taskTitle);
  if (taskIndex === null) return;
  return (projects[projectIndex].tasks.splice(taskIndex, 1));
}

export function switchCompletion(projectName, taskTitle) {
  const projectIndex = getProjectIndex(projectName);
  if (projectIndex === null) return;
  const taskIndex = getTaskIndex(projectIndex, taskTitle);
  if (taskIndex === null) return;
  projects[projectIndex].tasks[taskIndex].switchComplete();
}

export function changeProject(previousProjectName, taskTitle, newProjectName) {
  if (projectsSelect.value != currentProject.textContent) {
  const movingTask = deleteTask(previousProjectName, taskTitle)[0];
  const newProjectindex = getProjectIndex(newProjectName);
  if (newProjectindex === null) return;
  projects[newProjectindex].tasks.push(movingTask);
  }
}

export function initialization() {
  createProject("Default");
  createTask('Default', 'Title', 'Description', '2024-10-08', 'Low');
  displayProjects();
  displayProject('Default');
}
