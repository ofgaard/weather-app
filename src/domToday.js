import { renderTasksToPage } from "./domTaskManager.js";

export default function renderTodayPage() {
    const todayPage = document.createElement('div');
    const mainArea = document.querySelector('.mainarea');
    todayPage.classList.add('today-page');

    const todayHeader = document.createElement('h2');
    todayHeader.textContent = 'Today';

    const todayList = document.createElement('ul');
    todayList.classList.add('today-list');

    todayPage.appendChild(todayHeader);
    todayPage.appendChild(todayList);

    mainArea.innerHTML = ''; // Clear mainArea before appending
    mainArea.appendChild(todayPage);

    const render = renderTasksToPage().renderTodayPage;

    render();

}
