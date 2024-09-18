export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    complete = false;
    set complete(arg) {
        if (complete === fasle) {
            complete = true; 
        } else {complete = false}; 
    }

    set title(arg) {
        this.title = arg;
    }

    set description(arg) {
        this.description = arg;
    }
    
    set dueDate(arg) {
        this.dueDate = arg;
    }

    set priority(arg) {
        this.priority = arg;
    }

    
    
}