import TaskList from './tasklist.js';
import { ProjectList, addTaskToProject } from './projectmanager.js';
import { parse, format, isToday, isFuture, isValid } from 'date-fns';
import renderTodayPage from './domToday.js';
import renderUpcomingPage from './domUpcoming.js'; // Ensure you have this function

export default function ManageTasks() {
    function createTask(taskname, description, duedate, project) {
        const parsedDate = parse(duedate, 'dd-MM-yyyy', new Date());
        if (!isValid(parsedDate)) {
            return;
        }

        const newTask = {
            taskname,
            description,
            duedate: format(parsedDate, 'yyyy-MM-dd'),
            project,
            isComplete: false
        };

        if (isToday(parsedDate) && !TaskList.today.includes(newTask)) {
            TaskList.today.push(newTask);
            renderTodayPage(); // Re-render Today page
        } else if (isFuture(parsedDate)) {
            TaskList.upcoming.push(newTask);
            renderUpcomingPage(); // Re-render Upcoming page
        }

        addTaskToProject(project, newTask);
        return newTask;
    }

    function completeTask(task) {
        task.isComplete = !task.isComplete;
    }

    function removeTodayTask(task) {
       const taskList = TaskList.today;
       if (taskList.includes(task)) {
           taskList.splice(taskList.indexOf(task), 1);
           renderTodayPage(); // Re-render Today page
       }
    }

    function removeUpcomingTask(task) {
        const taskList = TaskList.upcoming;
        if (taskList.includes(task)) {
            taskList.splice(taskList.indexOf(task), 1);
            renderUpcomingPage(); // Re-render Upcoming page
        }
    }
    return {
        createTask,
        completeTask,
        removeTodayTask,
        removeUpcomingTask
    };
}
