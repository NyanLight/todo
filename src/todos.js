class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export const projects = {
  Inbox: [new Todo('3', '4', '2', '1')],
  Completed: [new Todo('1', '2', '3', '4')],
};

export const todoController = {
  createProject(name) {
    if (Object.keys(projects).length >= 5) return false;
    projects[name] = [];
  },

  deleteProject(name) {
    delete projects[name];
  },

  createTodo(title, description, dueDate, priority, project) {
    const todo = new Todo(title, description, dueDate, priority);
    projects[project].push(todo);
  },

  deleteTodo(project, title) {
    const searchTitle = (project) => (project.title = title);
    const index = projects[project].findIndex(searchTitle);
    projects[project].splice(index, 1);
  },

  markCompleted(project, title) {
    const searchTitle = (project) => (project.title = title);
    const index = projects[project].findIndex(searchTitle);
    const completedTask = projects[project].splice(index, 1);
    projects.Completed.push(completedTask);
  },

  getProjectsNames() {
    return Object.keys(projects);
  }

};

todoController.createTodo('hi', 'hi', '23', 'red', 'Inbox');