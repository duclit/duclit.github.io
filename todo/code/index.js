const modals = [
    ['Welcome to Todo', 'A todo app that focuses on simplicity and usability.', './assets/welcome.svg'],
    ['Groupings', 'Group your tasks with colors.', './assets/groupings.svg'],
    ['Recurring tasks', 'Do the same stuff every day? Configure Todo to automatically add tasks every day.', './assets/recurring.svg'],
    ['That’s it!', 'We hope you enjoy using Todo.', './assets/done.svg'],
]
let currentModal = 0;

const newTask = document.getElementById("task-input");
let tasks = document.getElementById("main").querySelectorAll(".task");

let currentColor = 'none';

function refreshButtonListeners(task) {
    for (const check of task.getElementsByClassName('task-check')) {
        check.addEventListener('click', () => {
            if (check.innerHTML.trim() === '') {
                check.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="6" fill="#1C1C1C"/>
                        <path d="M16.6667 8.5L10.25 14.9167L7.33337 12" stroke="#EBECEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `
                task.getElementsByClassName('task-name')[0].classList.add('strike');
            }
            else {
                check.innerHTML = ``
                task.getElementsByClassName('task-name')[0].classList.remove('strike');
            }

            saveTasks();
        });
    }

    for (const remove of task.getElementsByClassName('task-remove')) {
        remove.addEventListener('click', () => {
            task.classList.add('fadeout');
            task.addEventListener('animationend', (e) => {
                if (e.animationName == 'remove') {
                    task.remove();
                }
                saveTasks();
            });
        });
    }
}

function refreshTaskEventHandlers() {
    document.getElementById("main").querySelectorAll(".task").forEach(task => {
        refreshButtonListeners(task);
    });
}

function addTask() {
    if (newTask.value.trim() === '') {
        return;
    }

    let value = newTask.value
        .replace(/\_(.+)\_/, '<em>&nbsp;$1&nbsp;</em>')
        .replace(/\*(.+)\*/, '<b>&nbsp;$1&nbsp;</b>')
        .replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/, '<a href="$1">$1</a>&nbsp;');

    let node = document.createElement("div");
    node.innerHTML =
        `
            <button class="task-check"></button>
            <p class="task-name">${value}</p>
            <button class="task-remove">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 8.5L8.5 15.5" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.5 8.5L15.5 15.5" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;

    newTask.value = '';
    node.classList.add('task');
    node.style.borderLeft = `2px solid ${color_picker.value}`

    refreshButtonListeners(node);
    document.getElementById('main').prepend(node);

    saveTasks();
}

function keydownEvent(key) {
    console.log(key.code);
    if (key.code === "Enter") addTask()
}

newTask.addEventListener("keydown", keydownEvent);
document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') newTask.focus();
});

function saveTasks() {
    const tasks = [];

    for (const item of document.getElementsByClassName('task')) {
        console.log(item.style.borderLeft);
        
        tasks.push(
            [
                item.getElementsByClassName('task-name')[0].innerText, 
                item.getElementsByClassName('task-check')[0].innerHTML.trim() !== '',
                item.style.borderLeft
            ]
        );
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]));
        document.getElementById('main').innerHTML += 
            `
            <div class="task">
                <button class="task-check"></button>
                <p class="task-name">Type something in the box above and click enter to add a new task! Hover over this task to delete it.</p>
                <button class="task-remove">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 8.5L8.5 15.5" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.5 8.5L15.5 15.5" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            `
        
        nextModal();
    } else {
        document.getElementById('modal').remove();
        refreshTaskEventHandlers();
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.reverse();

    for (const [name, done, color] of tasks) {
        let node = document.createElement("div");
        node.innerHTML =
            `
                <button class="task-check">
                    ${done ? `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="6" fill="#1C1C1C"/>
                        <path d="M16.6667 8.5L10.25 14.9167L7.33337 12" stroke="#EBECEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    ` : ``}
                </button>
                <p class="task-name">${name}</p>
                <button class="task-remove">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 8.5L8.5 15.5" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.5 8.5L15.5 15.5" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            `;

        newTask.value = '';
        node.classList.add('task');
        node.style.borderLeft = color;

        if (done) {
            node.classList.add('strike');
        }

        refreshButtonListeners(node);
        document.getElementById('main').prepend(node);
    }
}

// modal

loadTasks();

function nextModal() {
    if (currentModal + 1 > 4) {
        document.getElementById('modal').remove();
        refreshTaskEventHandlers();
        newTask.addEventListener("keydown", keydownEvent);
        return;
    }
    
    const data = modals[currentModal];
    const image = data[2];
    const title = data[0];
    const description = data[1];
    
    document.getElementById('modal').innerHTML = 
        `
        <div class="modal-content">
            <img src="${image}" class="modal-anim-in">
            <div class="modal-heading-container modal-anim-in">
                <p class="modal-heading">${title}</p>
            </div>
            <div class="modal-description-container modal-anim-in">
                <p class="modal-description">${description}</p>
            </div>
            <button class="next-button modal-anim-in" onclick="nextModal()">Next</button>
        </div>
        `

    currentModal += 1;
}

refreshTaskEventHandlers();

let color_picker = document.getElementById("input-color-inner");
let color_picker_wrapper = document.getElementById("input-color");

color_picker.value = "#2176FF";

color_picker.onchange = function() {
	color_picker_wrapper.style.backgroundColor = color_picker.value;
    document.getElementById('input').style.borderLeft = `2px solid ${color_picker.value}`
}
color_picker_wrapper.style.backgroundColor = color_picker.value;
document.getElementById('input').style.borderLeft = `2px solid ${color_picker.value}`
