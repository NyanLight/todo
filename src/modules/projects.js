import { Task } from "./tasks";
export const projects = [];

export class Project {
  constructor(name) {
    this.name = name;
  }

  tasks = [];
}