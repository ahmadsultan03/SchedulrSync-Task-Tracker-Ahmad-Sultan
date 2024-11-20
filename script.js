// copyrights @ Muhammad Ahmad Sultan

document.addEventListener("DOMContentLoaded", renderTaskList);

function renderTaskList() {
  const taskListContainer = document.getElementById("task-list-container");
  taskListContainer.innerHTML = "";
  let storedTasks = localStorage.getItem("storedTasks");

  storedTasks = storedTasks ? JSON.parse(storedTasks) : [];

  storedTasks.forEach((task, taskIndex) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    taskElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    ${
                      task.imageUrl
                        ? `<img src="${task.imageUrl}" alt="Task Image" style="max-width:50%;height:auto; border-radius:10px;">`
                        : ""
                    }
                    <div class="task-actions">
                        <button onclick="handleTaskDeletion(${taskIndex})">Delete Task</button>
                    </div>
                `;
    taskListContainer.appendChild(taskElement);
  });
}

function handleTaskAddition() {
  const taskTitle = document.getElementById("task-title-input").value;
  const taskDescription = document.getElementById("task-desc-input").value;
  const taskImageInput = document.getElementById("task-image-input");
  let taskImageUrl = "";

  if (taskImageInput.files && taskImageInput.files[0]) {
    const imageReader = new FileReader();
    imageReader.onload = function (event) {
      taskImageUrl = event.target.result;
      storeTask(taskTitle, taskDescription, taskImageUrl);
    };
    imageReader.readAsDataURL(taskImageInput.files[0]);
  } else {
    storeTask(taskTitle, taskDescription, taskImageUrl);
  }
}

function storeTask(title, description, imageUrl) {
  if (title === "" || description === "") {
    window.alert("Please fill out both the task title and description.");
    return;
  }

  const newTask = {
    title: title,
    description: description,
    imageUrl: imageUrl,
  };

  let storedTasks = localStorage.getItem("storedTasks");
  storedTasks = storedTasks ? JSON.parse(storedTasks) : [];
  storedTasks.push(newTask);
  localStorage.setItem("storedTasks", JSON.stringify(storedTasks));

  renderTaskList();
  document.getElementById("task-title-input").value = "";
  document.getElementById("task-desc-input").value = "";
  document.getElementById("task-image-input").value = "";
}

function handleTaskDeletion(taskIndex) {
  let storedTasks = localStorage.getItem("storedTasks");
  storedTasks = storedTasks ? JSON.parse(storedTasks) : [];

  storedTasks.splice(taskIndex, 1);
  localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
  renderTaskList();
}
