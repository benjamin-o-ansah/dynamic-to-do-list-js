// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Step 1: Select essential DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Load existing tasks from Local Storage when the page loads
    loadTasks();

    /**
     * Loads all tasks stored in Local Storage and displays them in the DOM.
     */
    function loadTasks() {
        // Retrieve stored tasks or use an empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // For each stored task, add it to the DOM without saving again
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    /**
     * Adds a new task to the list and optionally saves it to Local Storage.
     * @param {string} taskText - The text of the task to add.
     * @param {boolean} save - Whether to save the task to Local Storage (default: true).
     */
    function addTask(taskText, save = true) {
        // If the function was triggered by button or Enter key, get input text
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Validate input
        if (taskText === "") {
            alert("Please enter a task before adding.");
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // required method

        // Assign click event to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append button and li to list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save task to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = "";
    }

    /**
     * Removes a specific task from Local Storage.
     * @param {string} taskText - The text of the task to remove.
     */
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add event listener for "Add Task" button
    addButton.addEventListener('click', () => addTask());

    // Add event listener for Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
