const renderTasks = function() {
    var box = document.querySelector(".todos")
    box.innerHTML = ''

    if(tasks.length > 0)
        tasks.forEach(function(el){
            var newTaskDiv = document.createElement("div")
            newTaskDiv.innerHTML = el.name
            newTaskDiv.classList.add("task")

            var span = document.createElement("span")
            span.classList.add("task-date")
            span.innerHTML = el.date

            newTaskDiv.append(span)

            box.append(newTaskDiv)
        })
}

const getDate = function() {
    var now = new Date()
    var dd = now.getDay()
    var mm = now.getMonth() + 1

    dd = (dd < 10 ? "0"+dd : dd)
    mm = (mm < 10 ? "0"+mm : mm)

    return now.getFullYear()+"-"+(mm)+"-"+dd
}

var tasks = JSON.parse(localStorage.getItem("todoTasks")) || []

renderTasks()

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("newTaskBtn").addEventListener("click", function() {
        var taskValue = document.querySelector("[name='newTask']").value
        document.querySelector("[name='newTask']").value = ''
        tasks.push({name: taskValue, date: getDate()})

        localStorage.setItem("todoTasks", JSON.stringify(tasks))
        renderTasks()
    })
})