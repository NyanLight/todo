import { Project } from "./projects";
import { projects } from "./projects";

export function createProject(name) {
  for (project of projects) {
    if (name === project.name) {
      alert("There is a project with the same name");
      return;
    } else {
      continue;
    }
  }
  projects.push(new Project(name));
  console.log(projects); 
}
