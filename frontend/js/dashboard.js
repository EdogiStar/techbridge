const API_URL =
  "https://techbridge-task-api.onrender.com/api/tasks";

let tasks = [];
let currentFilter = "all";
let currentSearch = "";

const taskGrid =
  document.getElementById("task-grid");

const totalTasksElement =
  document.getElementById("total-tasks");

const completedTasksElement =
  document.getElementById("completed-tasks");

const remainingTasksElement =
  document.getElementById("remaining-tasks");

const progressPercentageElement =
  document.getElementById("progress-percentage");

const progressBar =
  document.getElementById("progress-bar");

const taskSearch =
  document.getElementById("task-search");

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


/* =========================
   STATUS
========================= */

function formatStatus(status) {
  const statusNames = {
    completed: "Completed",
    "in-progress": "In Progress",
    "not-started": "Not Started"
  };

  return statusNames[status] || status;
}


/* =========================
   PROGRESS
========================= */

function updateProgress() {
  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
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

  totalTasksElement.textContent =
    totalTasks;

  completedTasksElement.textContent =
    completedTasks;

  remainingTasksElement.textContent =
    remainingTasks;

  progressPercentageElement.textContent =
    `${progressPercentage}%`;

  progressBar.style.width =
    `${progressPercentage}%`;
}


/* =========================
   FILTER + SEARCH
========================= */

function getFilteredTasks() {
  let filteredTasks = [...tasks];

  if (currentFilter !== "all") {
    filteredTasks =
      filteredTasks.filter(
        (task) =>
          task.status === currentFilter
      );
  }

  if (currentSearch.trim() !== "") {
    const searchTerm =
      currentSearch
        .trim()
        .toLowerCase();

    filteredTasks =
      filteredTasks.filter((task) => {
        const searchableText = `
          ${task.title}
          ${task.description}
          ${task.details}
        `.toLowerCase();

        return searchableText.includes(
          searchTerm
        );
      });
  }

  return filteredTasks;
}


/* =========================
   TASK RENDERING
========================= */

function renderTasks(taskList) {
  taskGrid.innerHTML = "";

  if (taskList.length === 0) {
    taskGrid.innerHTML = `
      <div class="task-message">
        <strong>No matching results found.</strong>
        <p>
          Try another search term or change the filter.
        </p>
      </div>
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

        <select
          class="status-select"
          data-id="${task.id}"
          aria-label="Change status for ${task.title}"
        >
          <option
            value="not-started"
            ${task.status === "not-started" ? "selected" : ""}
          >
            Not Started
          </option>

          <option
            value="in-progress"
            ${task.status === "in-progress" ? "selected" : ""}
          >
            In Progress
          </option>

          <option
            value="completed"
            ${task.status === "completed" ? "selected" : ""}
          >
            Completed
          </option>
        </select>

      </div>
    `;

    taskGrid.appendChild(taskCard);
  });

  updateProgress();
}


/* =========================
   LOADING / ERROR
========================= */

function showLoading() {
  taskGrid.innerHTML = `
    <div class="task-message">
      Loading tasks...
    </div>
  `;
}


function showError() {
  taskGrid.innerHTML = `
    <div class="task-message">
      <strong>Unable to load tasks.</strong>
      <p>
        Please check your connection and try again.
      </p>

      <button
        class="retry-task-btn"
        id="retry-task-btn"
      >
        Try Again
      </button>
    </div>
  `;

  const retryButton =
    document.getElementById("retry-task-btn");

  retryButton.addEventListener(
    "click",
    loadTasks
  );
}


/* =========================
   LOAD TASKS
========================= */

async function loadTasks() {
  showLoading();

  try {
    const response =
      await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        "Failed to load tasks"
      );
    }

    tasks = await response.json();

    renderTasks(
      getFilteredTasks()
    );

  } catch (error) {
    console.error(error);
    showError();
  }
}


/* =========================
   UPDATE TASK STATUS
========================= */

async function updateTaskStatus(
  taskId,
  status,
  selectElement
) {
  selectElement.disabled = true;

  try {
    const response =
      await fetch(
        `${API_URL}/${taskId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            status
          })
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to update task"
      );
    }

    const updatedTask =
      await response.json();

    const taskIndex =
      tasks.findIndex(
        (task) =>
          task.id === taskId
      );

    if (taskIndex !== -1) {
      tasks[taskIndex] =
        updatedTask;
    }

    renderTasks(
      getFilteredTasks()
    );

  } catch (error) {
    console.error(error);

    alert(
      "Unable to update task. Please try again."
    );

    renderTasks(
      getFilteredTasks()
    );
  }
}


/* =========================
   VIEW TASK
========================= */

async function viewTask(taskId) {
  try {
    const response =
      await fetch(
        `${API_URL}/${taskId}`
      );

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


/* =========================
   TASK EVENTS
========================= */

taskGrid.addEventListener(
  "click",
  async (event) => {

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


taskGrid.addEventListener(
  "change",
  async (event) => {

    const statusSelect =
      event.target.closest(
        ".status-select"
      );

    if (!statusSelect) {
      return;
    }

    const taskId =
      Number(
        statusSelect.dataset.id
      );

    const status =
      statusSelect.value;

    await updateTaskStatus(
      taskId,
      status,
      statusSelect
    );
  }
);


/* =========================
   FILTER EVENTS
========================= */

filterButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {

        currentFilter =
          button.dataset.filter;

        filterButtons.forEach(
          (btn) => {
            btn.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        renderTasks(
          getFilteredTasks()
        );
      }
    );
  }
);


/* =========================
   SEARCH
========================= */

taskSearch.addEventListener(
  "input",
  () => {
    currentSearch =
      taskSearch.value;

    renderTasks(
      getFilteredTasks()
    );
  }
);


/* =========================
   MODAL
========================= */

modalClose.addEventListener(
  "click",
  () => {
    modal.classList.remove(
      "show"
    );
  }
);


modal.addEventListener(
  "click",
  (event) => {
    if (
      event.target === modal
    ) {
      modal.classList.remove(
        "show"
      );
    }
  }
);


/* =========================
   TECHNOLOGIES
========================= */

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


technologyButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const technology =
          button.dataset.tech;

        const information =
          technologies[technology];

        if (!information) {
          return;
        }

        technologyButtons.forEach(
          (btn) => {
            btn.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        technologyContent.innerHTML = `
          <h3>
            ${information.title}
          </h3>

          <p>
            ${information.description}
          </p>

          <p>
            ${information.usage}
          </p>
        `;
      }
    );

  }
);


/* =========================
   START DASHBOARD
========================= */

loadTasks();