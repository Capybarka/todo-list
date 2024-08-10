"use strict";

let modal = document.querySelector('.modal');
let changePanel = document.querySelector('.changeTask_wrapper');
let tasksList = document.querySelector('.tasksList');

function check(value) {
    return value.length === 0 ? false : true;
}

// открытие окна для добавления новой задачи
document.querySelector('.btn-addTask').addEventListener('click', () => {
    modal.classList.remove('display-none');
})

// сохранение задач в localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// получение задач из localStorage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// загрузка задач при открытии страницы
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        addTaskToDOM(task.name, task.desc);
    });
}

// Функция для добавления задачи в DOM
function addTaskToDOM(taskNameInput, textInput) {
    let newTaskElement = document.createElement('li');
    newTaskElement.classList.add('task-item');

    newTaskElement.setAttribute('data-taskName', taskNameInput);
    newTaskElement.setAttribute('data-taskDesc', textInput);

    let taskName = document.createElement('p');
    taskName.classList.add('task-content');
    taskName.innerHTML = taskNameInput;
    newTaskElement.prepend(taskName);

    let taskControlPanel = document.createElement('div');
    taskControlPanel.classList.add('task-control');

    let btn1 = document.createElement('a');
    btn1.className = 'task-btn';
    btn1.innerHTML = 'Изменить';
    taskControlPanel.append(btn1);

    btn1.addEventListener('click', (event) => {
        event.stopPropagation();
        changePanel.classList.remove('display-none');

        document.querySelector('#changeName').value = newTaskElement.getAttribute('data-taskName');
        document.querySelector('#changeDesk').value = newTaskElement.getAttribute('data-taskDesc');


        let changeReadyBtn = document.querySelector('.changeBtn');
        changeReadyBtn.addEventListener('click', () => {
            let newName = document.querySelector('#changeName').value;
            let newDesc = document.querySelector('#changeDesk').value;

            taskName.innerHTML = newName;
            newTaskElement.setAttribute('data-taskName', newName);
            newTaskElement.setAttribute('data-taskDesc', newDesc);

            // обновляем задачи в localStorage
            let tasks = getTasksFromLocalStorage();
            tasks = tasks.map(task => task.name === taskNameInput ? { name: newName, desc: newDesc } : task);
            saveTasksToLocalStorage(tasks);

            changePanel.classList.add('display-none');
        })
    })

    let btn2 = document.createElement('a');
    btn2.className = 'task-btn';
    btn2.innerHTML = 'Удалить';
    taskControlPanel.append(btn2);

    btn2.addEventListener('click', (event) => {
        event.stopPropagation();
        newTaskElement.remove();

        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task.name !== taskNameInput);
        saveTasksToLocalStorage(tasks);
    })

    newTaskElement.append(taskControlPanel);
    tasksList.append(newTaskElement);

    // открытие страницы описания при нажатии на задачу
    newTaskElement.onclick = () => {
        const taskName = newTaskElement.getAttribute('data-taskName');
        const taskDesc = newTaskElement.getAttribute('data-taskDesc');
        window.location.href = `../html/description.html?name=${encodeURIComponent(taskName)}&desc=${encodeURIComponent(taskDesc)}`;
    }
}

// Функция для создания новой задачи
function createTask() {
    let taskNameInput = document.querySelector('#addTaskName-input').value.trim();
    let textInput = document.querySelector('#descriptionTask-input').value.trim();

    if (taskNameInput && textInput) {
        addTaskToDOM(taskNameInput, textInput);

        const tasks = getTasksFromLocalStorage();
        tasks.push({ name: taskNameInput, desc: textInput });
        saveTasksToLocalStorage(tasks);

        document.querySelector('#addTaskName-input').value = '';
        document.querySelector('#descriptionTask-input').value = '';

        modal.classList.add('display-none');
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
}

// при нажатии на кнопку Добавить, задача добавляется
document.querySelector('#addTaskBtn').onclick = () => {
    createTask();
}

// отмена добавления новой задачи
document.querySelector('#cancelAddTaskBtn').onclick = () => {
    document.querySelector('#addTaskName-input').value = '';
    document.querySelector('#descriptionTask-input').value = '';

    modal.classList.add('display-none');
}

// отмена изменения
document.querySelector('.changeCancelBtn').addEventListener('click', () => {
    changePanel.classList.add('display-none');
})

// реализация поиска задачи
function searchTask() {
    let searchValue = document.querySelector('#searchTask-input').value;

    let tasks = document.querySelectorAll('.task-item');

    for (let task of tasks) {
        if (task.firstElementChild.innerText.trim() === searchValue.trim()) {
            return task;
        }
    }

    return null;
}

// поиск задачи
document.querySelector('.btn__search').addEventListener('click', () => {
    let searchInput = document.querySelector('#searchTask-input');

    let foundTask = searchTask();

    if (foundTask) {
        let cloneTask = foundTask.cloneNode(true);

        document.querySelectorAll('.task-item').forEach(task => {
            task.classList.add('display-none');
        })

        tasksList.append(cloneTask);

        cloneTask.addEventListener('click', () => {
            const taskName = cloneTask.getAttribute('data-taskName');
            const taskDesc = cloneTask.getAttribute('data-taskDesc');
            window.location.href = `../html/description.html?name=${encodeURIComponent(taskName)}&desc=${encodeURIComponent(taskDesc)}`;
        });

        searchInput.value = '';
    }
    else {
        alert('Задача не найдена');
    }
});

// показать все задачи
document.querySelector('.btn__cancelSearch').onclick = () => {
    let allTasks = document.querySelectorAll('.task-item');

    if (allTasks.length > 0) {
        let lastTask = allTasks[allTasks.length - 1];
        lastTask.remove();

        allTasks.forEach(task => {
            task.classList.remove('display-none');
        })

    }
}

// Загружаем задачи при открытии страницы
window.addEventListener('DOMContentLoaded', loadTasks);






