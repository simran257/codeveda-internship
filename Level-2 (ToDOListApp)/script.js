let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
const list = document.getElementById("taskList");
list.innerHTML = "";

tasks.forEach((task, index) => {
let li = document.createElement("li");
li.textContent = task.text;

if (task.completed) {
li.classList.add("completed");
}

li.onclick = () => {
tasks[index].completed = !tasks[index].completed;
saveTasks();
renderTasks();
};

let del = document.createElement("span");
del.textContent = "✖";
del.classList.add("delete");

del.onclick = (e) => {
e.stopPropagation();
tasks.splice(index, 1);
saveTasks();
renderTasks();
};

li.appendChild(del);
list.appendChild(li);
});
}

function addTask() {
let input = document.getElementById("taskInput");
let text = input.value.trim();

if (text === "") return;
tasks.push({ text, completed: false });
input.value = "";
saveTasks();
renderTasks();
}
renderTasks();