import { Task } from "./tasks";
export const projects = [];


export class Project {
    constructor (name) {
        this.name = name;
    }

    tasks = [];
    addTask(title, description, dueDate, priority) {
            this.tasks.push(new Task(title, description, dueDate, priority))
    }
    
}