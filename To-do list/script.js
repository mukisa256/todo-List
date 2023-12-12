const taskinput = document.getElementById('task-input');
const addbtn = document.getElementById('add-btn');
const tasklist = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Event listener for the "Add" button
addbtn.addEventListener('click', () => {
    if (taskinput.value !== "") {
        const tasktext = taskinput.value;
        const listitem = document.createElement("li");
        listitem.innerHTML = `
            ${tasktext}
            <button class="delete-btn">Delete</button>
        `;
        
        tasklist.appendChild(listitem);
        saveTask(tasktext); // Save task to localStorage
        taskinput.value = "";
    }
});

// Event listener for the "Delete" button
tasklist.addEventListener('click', (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const listitem = event.target.parentElement;
        tasklist.removeChild(listitem);
        removeTask(listitem.textContent.trim()); // Remove task from localStorage
    }
});

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(tasktext => {
        const listitem = document.createElement("li");
        listitem.innerHTML = `
            ${tasktext}
            <button class="delete-btn">Delete</button>
        `;
        tasklist.appendChild(listitem);
    });
}

// Function to save a task to localStorage
function saveTask(tasktext) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(tasktext);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from localStorage
function removeTask(tasktext) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== tasktext);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
