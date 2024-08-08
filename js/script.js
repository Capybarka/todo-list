"use strict";

let modal = document.querySelector('.modal');
let changePanel = document.querySelector('.changeTask_wrapper');

function check(value) {
    return value.lenght === 0 ? false : true;
}


// открытие окна для добавления новой задачи
document.querySelector('.btn-addTask').addEventListener('click', () => {
    modal.classList.remove('display-none');
})

function createTask() {
    let taskNameInput = document.querySelector('#addTaskName-input').value.trim();
    let textInput = document.querySelector('#descriptionTask-input').value.trim();

    // проверка валидности
    if (taskNameInput && textInput) {
        // создаем li - новую задачу и вставляем в список
        let newTaskElement = document.createElement('li');
        newTaskElement.classList.add('task-item');

        // создаем параграф для названия задачи и вставяем в cаму задачу
        let taskName = document.createElement('p');
        taskName.classList.add('task-content');
        taskName.innerHTML = taskNameInput;
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
            // если есть блок описания задачи, то сначала его скрыть
            if (document.querySelector('.task-item-description')) {
                document.querySelector('.task-item-description').remove();
            }

            let changeReadyBtn = document.querySelector('.changeBtn');
            changeReadyBtn.onclick = () => {
                let newName = document.querySelector('#changeName').value;
                let newDesc = document.querySelector('#changeDesk').value;

                taskName.innerHTML = newName;
                textInput = newDesc;
                // очищение полей ввода новых данных
                newName = '';
                newDesc = '';

                changePanel.classList.add('display-none');
            }
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

        // кнопка отмены изменения
        let cancelChange = document.querySelector('.changeCancelBtn');
        cancelChange.addEventListener('click', () => {
            changePanel.classList.add('display-none');
        })

        newTaskElement.append(taskControlPanel);

        modal.classList.add('display-none');

        let tasksList = document.querySelector('.tasksList');
        tasksList.append(newTaskElement);  // вставляем новую задачу в список


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
                taskText.innerHTML = textInput;

                taskTextWrapper.append(taskText);

                newTaskElement.after(taskTextWrapper);

            }
        })

        // Очищаем поля ввода после успешного добавления задачи
        document.querySelector('#addTaskName-input').value = '';
        document.querySelector('#descriptionTask-input').value = ''
    }
    else {
        alert('!!!!!!!!!');
    }

}


// при нажатии на кнопку Добавить задача добавляется 
let addTaskBtn = document.querySelector('#addTaskBtn');
addTaskBtn.addEventListener('click', () => {
    createTask();
})






