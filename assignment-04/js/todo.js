document.addEventListener('DOMContentLoaded', function () {
    const addTaskBtn = document.getElementById('add-task');
    const taskInput = document.getElementById('task');
    const todoList = document.getElementById('todo-list');

    // Load tasks from localStorage if available
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to render tasks
    function renderTasks() {
        todoList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');

            // Create task text span
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add('completed');
            }

            // Create task actions div
            const actions = document.createElement('div');

            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
            toggleBtn.style.backgroundColor = task.completed ? '#7f8c8d' : '#2ecc71';
            toggleBtn.style.marginRight = '5px';

            toggleBtn.addEventListener('click', function () {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');

            deleteBtn.addEventListener('click', function () {
                if (confirm('Are you sure you want to delete this task?')) {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                }
            });

            // Append buttons to actions
            actions.appendChild(toggleBtn);
            actions.appendChild(deleteBtn);

            // Append elements to list item
            li.appendChild(taskText);
            li.appendChild(actions);

            // Append list item to todo list
            todoList.appendChild(li);
        });
    }

    // Add new task
    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Add new task to tasks array
        tasks.push({
            text: taskText,
            completed: false
        });

        // Save and render tasks
        saveTasks();
        renderTasks();

        // Clear input
        taskInput.value = '';
    });

    // Allow adding task with Enter key
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Initial render
    renderTasks();
});