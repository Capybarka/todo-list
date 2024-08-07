"use strict";

// открытие окна для добавления новой задачи
document.querySelector('.btn-addTask').addEventListener('click', () => {
    let modal = document.querySelector('.modal');
    modal.classList.remove('display-none');
})


function createTask() {
    let taskNameInput = document.querySelector('#addTaskName-input');
    let textInput = document.querySelector('#descriptionTask-input');

    // создаем li - новую задачу и вставляем в список
    let newTaskElement = document.createElement('li');
    newTaskElement.classList.add('task-item');

    // создаем параграф для названия задачи и вставяем в cаму задачу
    let taskName = document.createElement('p');
    taskName.classList.add('task-content');
    taskName.innerHTML = taskNameInput.value;
    newTaskElement.prepend(taskName);

    // контейнер с кнопками
    let taskControlPanel = document.createElement('div');
    taskControlPanel.classList.add('task-control');

    // создаем 2 кнопки внутри контейнера
    let btn1 = document.createElement('a');
    btn1.className = 'task-btn';
    btn1.innerHTML = 'Изменить';
    taskControlPanel.append(btn1);






    let btn2 = document.createElement('a');
    btn2.className = 'task-btn';
    btn2.innerHTML = 'Удалить';
    taskControlPanel.append(btn2);

    btn2.addEventListener('click', (event) => {
        event.stopPropagation();

        let desc = newTaskElement.nextElementSibling;
        if (desc && desc.classList.contains('task-item-description')) {
            desc.remove();
        }
        newTaskElement.remove();
    })



    newTaskElement.append(taskControlPanel);


    let modal = document.querySelector('.modal');
    modal.classList.add('display-none');


    let tasksList = document.querySelector('.tasksList');
    tasksList.append(newTaskElement);

    newTaskElement.addEventListener('click', () => {
        showDescription(newTaskElement, textInput);
    })
    // return newTaskElement;
}

function showDescription(task, text) {

    let elem = document.querySelector('.task-item-description');

    if (elem) {
        elem.remove();
    }
    else {
        let taskTextWrapper = document.createElement('div');
        taskTextWrapper.className = 'task-item';
        taskTextWrapper.classList.add('task-item-description');

        let taskText = document.createElement('p');
        taskText.innerHTML = text.value;

        taskTextWrapper.append(taskText);

        task.after(taskTextWrapper);
    }
}


// при нажатии на кнопку Добавить задача добавляется 
let addTaskBtn = document.querySelector('#addTaskBtn');
addTaskBtn.addEventListener('click', () => {
    createTask();
})




