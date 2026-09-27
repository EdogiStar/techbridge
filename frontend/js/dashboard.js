const API_URL = "http://localhost:3000/api/tasks";

let tasks = [];
let currentFilter = "all";

const taskGrid = document.getElementById("task-grid");

const completedTasksElement =
  document.getElementById("completed-tasks");

const remainingTasksElement =
  document.getElementById("remaining-tasks");

const progressPercentageElement =
  document.getElementById("progress-percentage");

const progressBar =
  document.getElementById("progress-bar");

const filterButtons =
  document.querySelectorAll(".filter-btn");

const modal =
  document.getElementById("task-modal");

const modalBody =
  document.getElementById("modal-body");

const modalClose =
  document.getElementById("modal-close");

const technologyButtons =
  document.querySelectorAll(".technology-btn");

const technologyContent =
  document.getElementById("technology-content");


function formatStatus(status) {
  const statusNames = {
    completed: "Completed",
    "in-progress": "In Progress",
    "not-started": "Not Started"
  };

  return statusNames[status] || status;
}


function updateProgress() {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const remainingTasks =
    totalTasks - completedTasks;

  const progressPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  completedTasksElement.textContent =
    completedTasks;

  remainingTasksElement.textContent =
    remainingTasks;

  progressPercentageElement.textContent =
    `${progressPercentage}%`;

  progressBar.style.width =
    `${progressPercentage}%`;
}


function renderTasks(taskList) {
  taskGrid.innerHTML = "";

  if (taskList.length === 0) {
    taskGrid.innerHTML = `
      <p class="task-message">
        No tasks found.
      </p>
    `;

    updateProgress();
    return;
  }

  taskList.forEach((task) => {
    const taskCard =
      document.createElement("article");

    taskCard.className =
      `task-card ${task.status}`;

    taskCard.innerHTML = `
      <div class="task-card-header">
        <span class="task-number">
          TASK ${task.id}
        </span>

        <span class="task-status">
          ${formatStatus(task.status)}
        </span>
      </div>

      <h3>${task.title}</h3>

      <p>${task.description}</p>

      <div class="task-actions">

        <button
          class="view-task-btn"
          data-id="${task.id}"
        >
          View Task
        </button>

        ${
          task.status !== "completed"
            ? `
              <button
                class="complete-task-btn"
                data-id="${task.id}"
              >
                Mark as Completed
              </button>
            `
            : ""
        }

      </div>
    `;

    taskGrid.appendChild(taskCard);
  });

  updateProgress();
}


function showLoading() {
  taskGrid.innerHTML = `
    <p class="task-message">
      Loading tasks...
    </p>
  `;
}


function showError() {
  taskGrid.innerHTML = `
    <p class="task-message">
      Unable to load tasks.<br>
      Please check your connection or try again.
    </p>
  `;
}


async function loadTasks() {
  showLoading();

  try {
    const response =
      await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load tasks");
    }

    tasks = await response.json();

    renderTasks(tasks);

  } catch (error) {
    console.error(error);
    showError();
  }
}


async function completeTask(taskId) {
  try {
    const response =
      await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "completed"
        })
      });

    if (!response.ok) {
      throw new Error(
        "Failed to update task"
      );
    }

    const updatedTask =
      await response.json();

    const taskIndex =
      tasks.findIndex(
        (task) => task.id === taskId
      );

    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
    }

    renderTasks(
      currentFilter === "all"
        ? tasks
        : tasks.filter(
            (task) =>
              task.status === currentFilter
          )
    );

  } catch (error) {
    console.error(error);

    alert(
      "Unable to update task. Please try again."
    );
  }
}


async function viewTask(taskId) {
  try {
    const response =
      await fetch(`${API_URL}/${taskId}`);

    if (!response.ok) {
      throw new Error(
        "Failed to load task"
      );
    }

    const task =
      await response.json();

    modalBody.innerHTML = `
      <span class="task-number">
        TASK ${task.id}
      </span>

      <h2>${task.title}</h2>

      <p>${task.details}</p>

      <span class="task-status">
        ${formatStatus(task.status)}
      </span>
    `;

    modal.classList.add("show");

  } catch (error) {
    console.error(error);

    alert(
      "Unable to load task. Please try again."
    );
  }
}


taskGrid.addEventListener(
  "click",
  async (event) => {
    const completeButton =
      event.target.closest(
        ".complete-task-btn"
      );

    if (completeButton) {
      const taskId =
        Number(
          completeButton.dataset.id
        );

      await completeTask(taskId);
      return;
    }

    const viewButton =
      event.target.closest(
        ".view-task-btn"
      );

    if (viewButton) {
      const taskId =
        Number(
          viewButton.dataset.id
        );

      await viewTask(taskId);
    }
  }
);


filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter =
      button.dataset.filter;

    currentFilter = filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    if (filter === "all") {
      renderTasks(tasks);
      return;
    }

    const filteredTasks =
      tasks.filter(
        (task) => task.status === filter
      );

    renderTasks(filteredTasks);
  });
});


modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
});


modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});


const technologies = {
  nextjs: {
    title: "Next.js",
    description:
      "Next.js is a React framework used to build modern, fast and scalable web applications.",
    usage:
      "It is commonly used for websites, dashboards, e-commerce platforms and full-stack applications."
  },

  vue: {
    title: "Vue.js",
    description:
      "Vue.js is a progressive JavaScript framework for building user interfaces and web applications.",
    usage:
      "Developers commonly use Vue.js to create interactive single-page applications and user interfaces."
  },

  angular: {
    title: "Angular",
    description:
      "Angular is a TypeScript-based framework for building structured and scalable web applications.",
    usage:
      "It is commonly used for large-scale applications, enterprise platforms and complex dashboards."
  },

  backend: {
    title: "Backend Development",
    description:
      "Backend development focuses on server-side logic, APIs, databases and business rules.",
    usage:
      "Technologies such as Node.js, Express.js and Laravel connect the frontend to databases and provide the services an application needs."
  }
};


technologyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const technology =
      button.dataset.tech;

    const information =
      technologies[technology];

    if (!information) return;

    technologyButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    technologyContent.innerHTML = `
      <h3>${information.title}</h3>

      <p>${information.description}</p>

      <p>${information.usage}</p>
    `;
  });
});


loadTasks();