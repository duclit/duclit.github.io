const newTask = document.getElementById("main").querySelectorAll(".new-task")[0];
let tasks = document.getElementById("main").querySelectorAll(".task");

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
                task.classList.add('translucent');
            }
            else {
                check.innerHTML = ``
                task.getElementsByClassName('task-name')[0].classList.remove('strike');
                task.classList.remove('translucent');
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
        });
        saveTasks();
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

    refreshButtonListeners(node);
    document.getElementById('main').prepend(node);

    saveTasks();
}

function keydownEvent(key) {
    if (key.code === "Enter") addTask()
}

newTask.addEventListener("keydown", keydownEvent);
document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') newTask.focus();
});
refreshTaskEventHandlers();

function saveTasks() {
    const tasks = [];

    for (const item of document.getElementsByClassName('task')) {
        tasks.push(
            [
                item.getElementsByClassName('task-name')[0].innerText, 
                item.getElementsByClassName('task-check')[0].innerHTML.trim() !== ''
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
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.reverse();

    for (const [name, done] of tasks) {
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

        if (done) {
            node.classList.add('strike');
            node.classList.add('translucent');
        }

        refreshButtonListeners(node);
        document.getElementById('main').prepend(node);
    }
}

loadTasks();
