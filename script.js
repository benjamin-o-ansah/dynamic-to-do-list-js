// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Step 1: Select essential DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Define the function to add tasks
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task before adding.");
            return;
        }

        // Step 3: Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Step 4: Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // ✅ Correct method

        // Step 5: Assign event to remove button
        removeButton.onclick = function() {
            taskList.removeChild(li);
        };

        // Step 6: Append remove button to the li, and li to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Step 7: Clear the input field
        taskInput.value = "";
    }

    // Step 8: Add event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Step 9: Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
