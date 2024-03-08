let tasks = []; 

class Task {
    constructor(title, description, deadline, priority, project) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.project = project;
    }

    deleteTask() {
        const index = tasks.indexOf(this);
        tasks.splice(index, 1);
    }

};

export function createTask (title, description, deadline, priority, project = 'inbox') {
    tasks.push(new Task(title, description, deadline, priority, project));
    console.log(tasks);
};
