const tasks = [
  {
    id: 1,
    title: "TechBridge Landing Page",
    description:
      "Build a responsive landing page for the TechBridge internship platform.",
    status: "completed",
    details:
      "Create a responsive TechBridge landing page using HTML5 and CSS3. Focus on clear structure, responsive layouts and a consistent visual style."
  },
  {
    id: 2,
    title: "TechBridge Programs",
    description:
      "Create a programs page that presents the available TechBridge programs.",
    status: "completed",
    details:
      "Create a programs page that presents the available TechBridge programs and their key information."
  },
  {
    id: 3,
    title: "Internship Tasks Experience",
    description:
      "Present the 30-day internship journey and the eight internship tasks.",
    status: "completed",
    details:
      "Present the 30-day internship experience and the eight tasks in a clear and easy-to-follow journey."
  },
  {
    id: 4,
    title: "Interactive Internship Task Tracker",
    description:
      "Build an interactive roadmap for the Data Analytics and Web Development tracks.",
    status: "completed",
    details:
      "Build an interactive internship roadmap that allows users to switch between the Data Analytics and Web Development tracks."
  },
  {
    id: 5,
    title: "Challenge Hub",
    description:
      "Build a challenge section where interns can explore and filter development challenges.",
    status: "completed",
    details:
      "Build the TechBridge Challenge Hub where interns can explore and filter challenges by development track."
  },
  {
    id: 6,
    title: "Intern Dashboard",
    description:
      "Build an interactive dashboard for tracking internship progress and exploring technologies.",
    status: "in-progress",
    details:
      "Build an interactive intern dashboard for tracking tasks, monitoring progress and exploring modern web technologies."
  },
  {
    id: 7,
    title: "Coming Soon",
    description:
      "Details for the next internship task will be added soon.",
    status: "not-started",
    details:
      "Details for this internship task will be provided by TechBridge."
  },
  {
    id: 8,
    title: "Coming Soon",
    description:
      "Details for the final internship task will be added soon.",
    status: "not-started",
    details:
      "Details for this internship task will be provided by TechBridge."
  }
];

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

  const progressPercentage = Math.round(
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


taskGrid.addEventListener("click", (event) => {
  const completeButton =
    event.target.closest(".complete-task-btn");

  if (!completeButton) return;

  const taskId =
    Number(completeButton.dataset.id);

  const task =
    tasks.find((task) => task.id === taskId);

  if (!task) return;

  task.status = "completed";

  renderTasks(tasks);
});


filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter =
      button.dataset.filter;

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


taskGrid.addEventListener("click", (event) => {
  const viewButton =
    event.target.closest(".view-task-btn");

  if (!viewButton) return;

  const taskId =
    Number(viewButton.dataset.id);

  const task =
    tasks.find((task) => task.id === taskId);

  if (!task) return;

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


renderTasks(tasks);