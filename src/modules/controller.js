import { Project } from "./projects";
import { projects } from "./projects";

function getProjectIndex(name) {
  let index = null;
  for (const i in projects) {
    if (projects[i].name === name) {
      index += i;
    } else {
      continue;
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
  if (index === undefined) return;
  projects.splice(index, 1); 
  console.log(projects);
}
