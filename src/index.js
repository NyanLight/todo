import './styles.css';
import { createProject, createTask, deleteProject, deleteTask } from './modules/controller';
import { projects } from './modules/projects';

createProject('hi');
createTask('hi', 'hey','','','');
createTask('hi', 'hey2','','','');
createTask('hi', 'hey3','','','');
deleteTask('hi', 'hey2');