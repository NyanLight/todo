import { Project } from "./projects";
import { projects } from "./projects";

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
  let index = null;
  for (const i in projects) {
    if (projects[i].name === name) {
      index = i;
      break;
    } else {
      continue;
    }
  }
  projects.splice(index, 1); 
  console.log(projects);
}
