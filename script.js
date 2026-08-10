const input = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

const allButton = document.getElementById("allButton");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");

const remainingCount = document.getElementById("remainingCount");
const clearCompletedButton = document.getElementById("clearCompletedButton");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateFilterButtons() {
    allButton.classList.remove("active");
    activeButton.classList.remove("active");
    completedButton.classList.remove("active");

    if (currentFilter === "all") {
        allButton.classList.add("active");
    }

    if (currentFilter === "active") {
        activeButton.classList.add("active");
    }

    if (currentFilter === "completed") {
        completedButton.classList.add("active");
    }
}

function updateRemainingCount() {
    const remainingTodos = todos.filter(function(todo) {
        return todo.completed === false;
    });

    remainingCount.textContent = "未完了 " + remainingTodos.length + "件";
}

function showTodos() {
    todoList.innerHTML = "";

    updateRemainingCount();

    const filteredTodos = todos.filter(function(todo) {
        if (currentFilter === "active") {
            return todo.completed === false;
        }

        if (currentFilter === "completed") {
            return todo.completed === true;
        }

        return true;
    });

    filteredTodos.forEach(function(todo) {
        const index = todos.indexOf(todo);

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener("change", function() {
            todos[index].completed = checkbox.checked;
            saveTodos();
            showTodos();
        });

        const span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.completed) {
            span.style.textDecoration = "line-through";
        }

        const editButton = document.createElement("button");
        editButton.textContent = "編集";

        editButton.addEventListener("click", function() {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = todo.text;
            editInput.className = "editInput";

            const saveButton = document.createElement("button");
            saveButton.textContent = "保存";

            const cancelButton = document.createElement("button");
            cancelButton.textContent = "キャンセル";

            li.innerHTML = "";

            li.appendChild(editInput);
            li.appendChild(saveButton);
            li.appendChild(cancelButton);

            editInput.focus();

            saveButton.addEventListener("click", function() {
                const newText = editInput.value.trim();

                if (newText === "") {
                    return;
                }

                todos[index].text = newText;
                saveTodos();
                showTodos();
            });

            cancelButton.addEventListener("click", function() {
                showTodos();
            });

            editInput.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    saveButton.click();
                }

                if (event.key === "Escape") {
                    cancelButton.click();
                }
            });
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";

        deleteButton.addEventListener("click", function() {
            todos.splice(index, 1);
            saveTodos();
            showTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    });
}

addButton.addEventListener("click", function() {
    const todoText = input.value.trim();

    if (todoText === "") {
        return;
    }

    todos.push({
        text: todoText,
        completed: false
    });

    saveTodos();
    showTodos();

    input.value = "";
});

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});

allButton.addEventListener("click", function() {
    currentFilter = "all";
    updateFilterButtons();
    showTodos();
});

activeButton.addEventListener("click", function() {
    currentFilter = "active";
    updateFilterButtons();
    showTodos();
});

completedButton.addEventListener("click", function() {
    currentFilter = "completed";
    updateFilterButtons();
    showTodos();
});

clearCompletedButton.addEventListener("click", function() {
    todos = todos.filter(function(todo) {
        return todo.completed === false;
    });

    saveTodos();
    showTodos();
});

updateFilterButtons();
showTodos();
