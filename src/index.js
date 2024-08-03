import './style.css';
import TaskList from './tasklist.js';
import ManageTasks from './taskmanager.js';
import { addTaskFunction } from './domTaskManager.js';
import renderTodayPage from './domToday.js';
import renderUpcomingPage from './domUpcoming.js';
import { ProjectList } from './projectmanager.js';
import { renderProjectList } from './domProjects.js';

// Sample tasks for testing
TaskList.today.push(
    { taskname: "Task 1", description: "Description 1", duedate: "10-07-2024", isComplete: false },
    { taskname: "Task 2", description: "Description 2", duedate: "10-07-2024", isComplete: false }
);

TaskList.upcoming.push(
    { taskname: "Task 1", description: "Description 1", duedate: "11-07-2024", isComplete: false },
    { taskname: "Task 2", description: "Description 2", duedate: "11-07-2024", isComplete: false }
);

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-todo');
    const todayButton = document.querySelector('.today-todo');
    const upcomingButton = document.querySelector('.upcoming-todo');

    addButton.addEventListener('click', addTaskFunction);

    todayButton.addEventListener('click', renderTodayPage);

    upcomingButton.addEventListener('click', renderUpcomingPage);

    renderProjectList();

});
