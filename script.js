const renderTasks = function() {
    const box = document.querySelector(".todos");
    box.innerHTML = '';

    if(tasks.length > 0) {
        document.querySelector("section.no-task").classList.add("hide");

        tasks.forEach(function (el, idx) {
            const taskBox = document.createElement("div");
            taskBox.classList.add("task");

            if(el.done === true)
                taskBox.classList.add("done");


            const newTaskDiv = document.createElement("div");
            newTaskDiv.innerHTML = el.name;

            const span = document.createElement("span");
            span.classList.add("task-date");
            span.innerHTML = el.date;

            const taskDivBtns = document.createElement("div");
            taskDivBtns.classList.add("task-btns")
            taskDivBtns.setAttribute("data-task-id", idx);

            const button = document.createElement("button");
            button.classList.add("btn", "remove-btn");
            button.setAttribute("title", "Usuń zadanie");

            const icon = document.createElement("i");
            icon.classList.add("icon", "minus-icon");


            if(el.done === false) {
                const tickButton = document.createElement("button");
                tickButton.classList.add("btn", "tick-btn");
                tickButton.setAttribute("title", "Oznacz jako ukończone");

                const tickIcon = document.createElement("i");
                tickIcon.classList.add("icon", "tick-icon");

                tickButton.append(tickIcon);
                taskDivBtns.append(tickButton);
            }

            button.append(icon);
            newTaskDiv.append(span);
            taskDivBtns.append(button);
            taskBox.append(newTaskDiv);
            taskBox.append(taskDivBtns);
            box.append(taskBox);
        })
    }
    else {
        document.querySelector("section.no-task").classList.remove("hide")
    }
};

const getDate = function() {
    const now = new Date();
    let dd = now.getDay();
    let mm = now.getMonth() + 1;

    dd = (dd < 10 ? "0"+dd : dd);
    mm = (mm < 10 ? "0"+mm : mm);

    return now.getFullYear()+"-"+(mm)+"-"+dd
};

const saveTasks = function() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
};

const getClickedTaskId = function(e) {
    let clickedEl = e.target;

    if(e.target.tagName === 'I')
        clickedEl = e.target.parentElement;

    return clickedEl.parentElement.getAttribute('data-task-id');
};

const removeTask = function(e) {
    tasks.splice(getClickedTaskId(e), 1);
    saveTasks();
    renderTasks();
};

const markTaskAsDone = function(e) {
    const task = tasks[getClickedTaskId(e)];
    task.done = true;

    tasks.splice(getClickedTaskId(e), 1);
    tasks.push(task);

    saveTasks();
    renderTasks();
};

const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

document.addEventListener("DOMContentLoaded", function(){
    renderTasks();

    document.querySelector("#newTaskBtn").addEventListener("click", function() {
        const taskValue = document.querySelector("[name='newTask']").value;
        document.querySelector("[name='newTask']").value = '';
        tasks.unshift({name: taskValue, date: getDate(), done: false});

        saveTasks();
        renderTasks()
    });

    document.addEventListener("click", (e) => {
        if (e.target && (e.target.matches(".remove-btn") || e.target.matches(".remove-btn i")))
            removeTask(e);
        else if (e.target && (e.target.matches(".tick-btn") || e.target.matches(".tick-btn i")))
            markTaskAsDone(e);
    });
});