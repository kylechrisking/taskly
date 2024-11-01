// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listener for the "Add Task" button
document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (taskText) {
        addTask(taskText);
        taskInput.value = ''; // Clear input field
    }
});

// Function to add a task
function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a delete button as an "X"
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        deleteTask(taskText, li);
    };

    li.appendChild(deleteButton);
    document.getElementById('taskList').appendChild(li);
    
    // Save task to local storage
    saveTaskToLocalStorage(taskText);
}

// Function to save task to local storage
function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;

        // Create a delete button as an "X"
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            deleteTask(task, li);
        };

        li.appendChild(deleteButton);
        document.getElementById('taskList').appendChild(li);
    });
}

// Function to delete a task
function deleteTask(taskText, li) {
    // Remove the task from the displayed list
    document.getElementById('taskList').removeChild(li);

    // Remove the task from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
