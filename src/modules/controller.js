import { Project } from "./projects";
import { projects } from "./projects";
import { Task } from "./tasks";

function getProjectIndex(name) {
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
      continue
    }
  }
}

export function createProject(name) {
  for (const project of projects) {
    if (name === project.name) {
      alert("There is a project with the same name");
      return;
    } else {
      continue;
    }
  }
  projects.push(new Project(name));
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
  console.log(projects[index].tasks);
}

export function deleteTask(projectName, taskTitle) {
  const projectIndex = getProjectIndex(projectName);
  if (projectIndex === null) return;
  const taskIndex = getTaskIndex(projectIndex, taskTitle);
  if (taskIndex === null) return;
  projects[projectIndex].tasks.splice(taskIndex, 1);
  console.log(projects[projectIndex].tasks);
}

export function switchCompletion(projectName, taskTitle) {
  const projectIndex = getProjectIndex(projectName);
  if (projectIndex === null) return;
  const taskIndex = getTaskIndex(projectIndex, taskTitle);
  if (taskIndex === null) return;
  projects[projectIndex].tasks[taskIndex].switchComplete(); 
  console.log(projects[projectIndex].tasks[taskIndex]); 
}