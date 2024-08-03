import ManageTasks from './taskmanager.js';
import TaskList from './tasklist.js';
import renderTodayPage from './domToday.js';
import renderUpcomingPage from './domUpcoming.js';
import { ProjectList } from './projectmanager.js';

const taskManager = ManageTasks();

export function addTaskFunction() {
    const addButton = document.querySelector('.add-todo');

    addButton.addEventListener('click', () => {
        if (!document.querySelector('.modal-container')) {
            const modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-container');

            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');

            const closeButton = document.createElement('span');
            closeButton.classList.add('close');
            closeButton.textContent = 'X';
            closeButton.addEventListener('click', () => {
                modalContainer.remove();
            });

            const form = document.createElement('form');
            form.classList.add('add-task-form');

            const taskName = document.createElement('input');
            taskName.setAttribute('type', 'text');
            taskName.setAttribute('placeholder', 'Task Name');
            taskName.setAttribute('name', 'taskname');
            taskName.classList.add('task-name');

            const description = document.createElement('input');
            description.setAttribute('type', 'text');
            description.setAttribute('placeholder', 'Description');
            description.setAttribute('name', 'description');

            const dueDate = document.createElement('input');
            dueDate.setAttribute('type', 'date');
            dueDate.setAttribute('name', 'duedate');

            const project = document.createElement('select');
            project.setAttribute('name', 'project');
            project.classList.add('project-select');
            const homeOption = document.createElement('option');
            homeOption.textContent = 'Home';
            homeOption.setAttribute('value', 'home');
            const workOption = document.createElement('option');
            workOption.textContent = 'Work';
            workOption.setAttribute('value', 'work');
            const projectOption = document.createElement('option');
            projectOption.textContent = 'Project';
            projectOption.setAttribute('value', 'project');
            project.appendChild(workOption);
            project.appendChild(homeOption);


            const submitButton = document.createElement('button');
            submitButton.setAttribute('type', 'submit');
            submitButton.textContent = 'Add Task';
            submitButton.classList.add('add-task-button');

            modalContent.appendChild(closeButton);
            form.appendChild(taskName);
            form.appendChild(description);
            form.appendChild(dueDate);
            form.appendChild(project);
            form.appendChild(submitButton);
            modalContent.appendChild(form);
            modalContainer.appendChild(modalContent);
            document.body.appendChild(modalContainer);

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const task = {
                    taskName: taskName.value,
                    description: description.value,
                    dueDate: reformatDate(dueDate.value),
                    project: project.value

                };
                taskManager.createTask(task.taskName, task.description, task.dueDate, task.project);
                modalContainer.remove();
                renderTodayPage();  // Render the updated task list after adding a task
                console.log(ProjectList.home)
                console.log(ProjectList.work)
            });

            function reformatDate(dateStr) {
                const [year, month, day] = dateStr.split('-');
                return `${day}-${month}-${year}`;
            }
        }
    });
}

export function renderTasksToPage() {
    const taskLists = {
        today: document.querySelector('.today-list'),
        upcoming: document.querySelector('.upcoming-list'),
    };

    function renderTasks(tasks, targetElement) {
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-item');

            const nameDiv = document.createElement('div');
            nameDiv.textContent = task.taskname;
            nameDiv.classList.add('task-name-div');
            taskDiv.appendChild(nameDiv);

            const descriptionDiv = document.createElement('div');
            descriptionDiv.textContent = task.description;
            taskDiv.appendChild(descriptionDiv);

            const dueDateDiv = document.createElement('div');
            dueDateDiv.textContent = task.duedate;
            taskDiv.appendChild(dueDateDiv);

            const projectDiv = document.createElement('div');
            projectDiv.textContent = displayProject(task.project);
            taskDiv.appendChild(projectDiv);

            const completeCheckbox = document.createElement('input');
            completeCheckbox.classList.add('complete-checkbox');
            completeCheckbox.setAttribute('type', 'checkbox');
            completeCheckbox.checked = task.isComplete;
            completeCheckbox.addEventListener('change', () => {
                taskManager.completeTask(task);
                if (targetElement === taskLists.today) {
                    taskManager.removeTodayTask(task);
                    renderTodayPage(); // Re-render Today page after completing a task
                } else if (targetElement === taskLists.upcoming) {
                    taskManager.removeUpcomingTask(task);
                    renderUpcomingPage(); // Re-render Upcoming page after completing a task
                }
            });
            taskDiv.appendChild(completeCheckbox);

            targetElement.appendChild(taskDiv);
        });
    }

    function displayProject(project) {
        if (project === 'home') {
            return 'Home';
        } else if (project === 'work') {
            return 'Work';
        } else {
            return project;
        }
    }

    function renderTodayPage() {
        taskLists.today.innerHTML = ''; // Clear existing tasks
        renderTasks(TaskList.today, taskLists.today);
    }

    function renderUpcomingPage() {
        taskLists.upcoming.innerHTML = ''; // Clear existing tasks
        renderTasks(TaskList.upcoming, taskLists.upcoming);
    }

    return {
        renderTodayPage,
        renderUpcomingPage,
    };

    }

   


