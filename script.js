// Replace your existing JavaScript with this

document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.name;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', () => toggleTask(index));

            // Edit button
            const editButton = document.createElement('button');
            editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent task click event from firing
                editTask(index);
            });
            li.appendChild(editButton);

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-times"></i>';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent task click event from firing
                deleteTask(index);
            });
            li.appendChild(deleteButton);

            // Append the task item to the task list
            taskList.appendChild(li);
        });
    }

    // Add new task
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    // Toggle task completion
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Edit task
    function editTask(index) {
        const newName = prompt('Enter new task name:', tasks[index].name);
        if (newName !== null) {
            tasks[index].name = newName.trim();
            saveTasks();
            renderTasks();
        }
    }

    // Delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();
});
// Select the canvas element
const canvas = document.querySelector('.canvas');

// Function to create a bubble
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.width = `${Math.random() * 40 + 10}px`; // Random width between 10px and 50px
    bubble.style.height = bubble.style.width; // Make the height the same as the width for a perfect circle
    bubble.style.left = `${Math.random() * 100}%`; // Random horizontal position
    canvas.appendChild(bubble);
    // Remove the bubble after animation completes
    bubble.addEventListener('animationend', () => {
        canvas.removeChild(bubble);
    });
}

// Function to create multiple bubbles
function createBubbles(count) {
    for (let i = 0; i < count; i++) {
        createBubble();
    }
}

// Generate bubbles every second
setInterval(() => {
    createBubbles(3); // Adjust the number of bubbles generated per interval
}, 1000);
