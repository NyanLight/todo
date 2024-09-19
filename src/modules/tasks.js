export class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  complete = false;

  switchComplete() {
    this.complete === false ? this.complete = true : this.complete = false;
  }
}
