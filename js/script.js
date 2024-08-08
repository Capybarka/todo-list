"use strict";

let modal = document.querySelector('.modal');
let changePanel = document.querySelector('.changeTask_wrapper');


// открытие окна для добавления новой задачи
document.querySelector('.btn-addTask').addEventListener('click', () => {
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

    // изменение задачи 
    let btn1 = document.createElement('a');
    btn1.className = 'task-btn';
    btn1.innerHTML = 'Изменить';
    taskControlPanel.append(btn1);

    btn1.addEventListener('click', (event) => {
        event.stopPropagation();

        changePanel.classList.remove('display-none');
    })

    let changeReadyBtn = document.querySelector('.changeBtn');
    changeReadyBtn.addEventListener('click', () => {
        let newName = document.querySelector('#changeName');
        let newDesc = document.querySelector('#changeDesk');

        taskName.innerHTML = newName.value;
        newTaskElement.nextElementSibling.innerHTML = newDesc.value;

        // очищение полей ввода новых данных
        newName.value = '';
        newDesc.value = '';

        changePanel.classList.add('display-none');
    })

    // кнопка отмены изменения
    let cancelChange = document.querySelector('.changeCancelBtn');
    cancelChange.addEventListener('click', () => {
        changePanel.classList.add('display-none');
    })


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

    modal.classList.add('display-none');

    let tasksList = document.querySelector('.tasksList');
    tasksList.append(newTaskElement);


    // открытие описания
    newTaskElement.addEventListener('click', () => {
        let elem = document.querySelector('.task-item-description');

        if (elem) {
            elem.remove();
        }
        else {
            let taskTextWrapper = document.createElement('div');
            taskTextWrapper.className = 'task-item';
            taskTextWrapper.classList.add('task-item-description');

            let taskText = document.createElement('p');
            taskText.innerHTML = textInput.value;

            taskTextWrapper.append(taskText);

            newTaskElement.after(taskTextWrapper);
        }
    })
}


// document.querySelector('.changeBtn').addEventListener('click', changeTask)

// function showDescription(task, text) {

//     let elem = document.querySelector('.task-item-description');

//     if (elem) {
//         elem.remove();
//     }
//     else {
//         let taskTextWrapper = document.createElement('div');
//         taskTextWrapper.className = 'task-item';
//         taskTextWrapper.classList.add('task-item-description');

//         let taskText = document.createElement('p');
//         taskText.innerHTML = text.value;

//         taskTextWrapper.append(taskText);

//         task.after(taskTextWrapper);
//     }
// }


// при нажатии на кнопку Добавить задача добавляется 
let addTaskBtn = document.querySelector('#addTaskBtn');
addTaskBtn.addEventListener('click', () => {
    createTask();
})




