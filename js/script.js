"use strict";

let modal = document.querySelector('.modal');
let changePanel = document.querySelector('.changeTask_wrapper');
let tasksList = document.querySelector('.tasksList');

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

        // присвоение атрибутов
        newTaskElement.setAttribute('data-taskName', taskNameInput);
        newTaskElement.setAttribute('data-taskDesc', textInput);


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
            changePanel.classList.remove('display-none');

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

        tasksList.append(newTaskElement);  // вставляем новую задачу в список

        // Очищаем поля ввода после успешного добавления задачи
        document.querySelector('#addTaskName-input').value = '';
        document.querySelector('#descriptionTask-input').value = '';


        // открытие страницы описания при нажатии на задачу
        newTaskElement.onclick = () => {
            const taskName = newTaskElement.getAttribute('data-taskName');
            const taskDesc = newTaskElement.getAttribute('data-taskDesc');
            window.location.href = `../html/description.html?name=${encodeURIComponent(taskName)}&desc=${encodeURIComponent(taskDesc)}`;
        }
    }
    else {
        alert('Пожалуйста, заполните все поля!')
    }
}


// при нажатии на кнопку Добавить, задача добавляется 
document.querySelector('#addTaskBtn').onclick = () => {
    createTask();
}

// отмена добавления новой задачи
document.querySelector('#cancelAddTaskBtn').onclick = () => {
    // Очищаем поля ввода 
    document.querySelector('#addTaskName-input').value = '';
    document.querySelector('#descriptionTask-input').value = ''

    modal.classList.add('display-none');
}

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

    // поиск задачи и ее показ
    let foundTask = searchTask();

    if (foundTask) {
        let cloneTask = foundTask.cloneNode(true);

        //скрываем задачи
        document.querySelectorAll('.task-item').forEach(task => {
            task.classList.add('display-none');
            searchInput.value = '';
        })

        tasksList.append(cloneTask);
    }
});

document.querySelector('.btn__cancelSearch').onclick = () => {
    document.querySelectorAll('.task-item').forEach(task => {
        task.classList.remove('display-none');
    })
}










