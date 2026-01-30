const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById ("taskInput");
const taskList = document.getElementById ("taskList");
const clearBtn = document.getElementById ("clearBtn");

window.addEventListener("DOMContentLoaded" , loadTasks);

taskForm.addEventListener("submit" , (e) =>{
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;
    addTask(text, false);
    taskInput.value = "";
    taskInput.focus();
    saveTasks();
});
function addTask (text,completed = false) {
    const li = document.createElement("li"); 
    li.className = "task-item";
    if (completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;
    span.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });
    const delBtn = document.createElement ("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener ("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
    });
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
}
clearBtn.addEventListener("click", () => {
    if(!taskList.hasChildNodes()) return;
    const ok  = confirm("Are you sure you want to delete all tasks?");
if (!ok) return;
taskList.innerHTML = "";

localStorage.removeItem("tasks");
});
function saveTasks() {
    const items = [];

    document.querySelectorAll(".task-item").forEach(li => {
        const text = li.querySelector(".task-text").textContent;
        const completed = li.classList.contains ("completed");
        items.push ({text,completed});
    });
    localStorage.setItem("tasks",JSON.stringify(items));
}
function loadTasks () {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
        saved.forEach(item => addTask(item.text,item.completed));
    
}