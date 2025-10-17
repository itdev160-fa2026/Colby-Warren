// Activity 6: Interactive To-Do List (Part 2)
// Enhanced to-do list with refactored functions and filter feature

console.log("=== Activity 6: Enhanced To-Do List Application ===");

// Global variables for task management
let tasks = [];
let taskIdCounter = 1;

// Part D: To-Do List Core Functionality 
console.log("\n=== TO-DO LIST FUNCTIONALITY ===");

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    console.log(`Attempting to add task: "${taskText}"`);

    // Validate input
    if (taskText === "") {
        alert("Please enter a task!");
        console.log("Task addition failed: empty input");
        return;
    }

    if (taskText.length > 100) {
        alert("Task is too long! Please keep it under 100 characters.");
        console.log("Task addition failed: too long");
        return;
    }

    // Create task object
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date()
    };

    // Add to tasks array
    tasks.push(task);
    console.log("Task added to array:", task);

    // Create and add list item
    const todoList = document.getElementById("todo-list");
    const listItem = createTaskElement(task);
    todoList.appendChild(listItem);

    // Clear input field
    taskInput.value = "";

    // Update stats
    updateTaskStats();
    console.log(`Task "${taskText}" added successfully. Total tasks: ${tasks.length}`);
}

function createTaskElement(task) {
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.setAttribute("data-task-id", task.id);

    const taskTextSpan = document.createElement("span");
    taskTextSpan.className = "task-text";
    taskTextSpan.textContent = task.text;

    const statusSpan = document.createElement("span");
    statusSpan.className = "task-status";

    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "\u2713 Done";
        statusSpan.classList.add("status-done");
    } else {
        statusSpan.textContent = "\u23F3 Pending";
        statusSpan.classList.add("status-pending");
    }

    listItem.appendChild(taskTextSpan);
    listItem.appendChild(statusSpan);

    // Toggle completion on click
    listItem.onclick = () => toggleTaskCompletion(task.id);

    return listItem;
}

// Part E: Task State Management 
function toggleTaskCompletion(taskId) {
    console.log(`Toggling completion for task ID: ${taskId}`);

    const task = tasks.find(t => t.id === taskId);
    if (!task) return console.error(`Task with ID ${taskId} not found`);

    task.completed = !task.completed;

    const listItem = document.querySelector(`[data-task-id="${taskId}"]`);
    const statusSpan = listItem.querySelector(".task-status");

    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "\u2713 Done";
        statusSpan.className = "task-status status-done";
    } else {
        listItem.classList.remove("done");
        statusSpan.textContent = "\u23F3 Pending";
        statusSpan.className = "task-status status-pending";
    }

    updateTaskStats();
}

function updateTaskStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    document.getElementById("taskCount").textContent = `(${totalTasks} task${totalTasks !== 1 ? "s" : ""})`;
    document.getElementById("totalTasks").textContent = `Total: ${totalTasks}`;
    document.getElementById("completedTasks").textContent = `Completed: ${completedTasks}`;
    document.getElementById("pendingTasks").textContent = `Pending: ${pendingTasks}`;

    console.log(`Stats updated - Total: ${totalTasks}, Completed: ${completedTasks}, Pending: ${pendingTasks}`);
}

// Bulk Actions
function markAllDone() {
    tasks.forEach(task => task.completed = true);

    document.querySelectorAll(".task-item").forEach(item => {
        item.classList.add("done");
        const statusSpan = item.querySelector(".task-status");
        statusSpan.textContent = "\u2713 Done";
        statusSpan.className = "task-status status-done";
    });

    updateTaskStats();
    console.log("All tasks marked as done.");
}

function deleteCompleted() {
    tasks = tasks.filter(task => !task.completed);

    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    tasks.forEach(task => todoList.appendChild(createTaskElement(task)));

    updateTaskStats();
    console.log("Deleted all completed tasks.");
}

function clearAllTasks() {
    tasks = [];
    document.getElementById("todo-list").innerHTML = "";
    updateTaskStats();
    console.log("Cleared all tasks.");
}

// Filter Functionality
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Switch active button
        document.querySelector(".filter-btn.active").classList.remove("active");
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");
        const items = document.querySelectorAll(".task-item");

        items.forEach(item => {
            const isDone = item.classList.contains("done");

            if (
                filter === "all" ||
                (filter === "pending" && !isDone) ||
                (filter === "completed" && isDone)
            ) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// Event Listeners 
document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
});
document.getElementById("markAllDoneBtn").addEventListener("click", markAllDone);
document.getElementById("deleteCompletedBtn").addEventListener("click", deleteCompleted);
document.getElementById("clearAllBtn").addEventListener("click", clearAllTasks);

// Initialize App 
console.log("To-Do List application initialized successfully!");
console.log("Try adding some tasks and using the filter buttons!");
