import { renderTasksToPage } from "./domTaskManager.js";

export default function renderUpcomingPage() {
    const upcomingPage = document.createElement('div');
    const mainArea = document.querySelector('.mainarea');
    upcomingPage.classList.add('upcoming-page');

    const upcomingHeader = document.createElement('h2');
    upcomingHeader.textContent = 'Upcoming';

    const upcomingList = document.createElement('ul');
    upcomingList.classList.add('upcoming-list');

    upcomingPage.appendChild(upcomingHeader);
    upcomingPage.appendChild(upcomingList);

    mainArea.innerHTML = ''; 
    mainArea.appendChild(upcomingPage);

    const render = renderTasksToPage().renderUpcomingPage;

    render();
}
