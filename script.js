// ==================== MOBILE NAVIGATION ====================

const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const menuIcon = document.querySelector(".menu-icon");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  // Close the mobile menu when a navigation link is clicked
  const navLinks = mainNav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("nav-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    });
  });

  // Close the menu when clicking outside it
  document.addEventListener("click", (event) => {
    const clickedInsideNav = mainNav.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (
      !clickedInsideNav &&
      !clickedMenuButton &&
      mainNav.classList.contains("nav-open")
    ) {
      mainNav.classList.remove("nav-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    }
  });
}


// ==================== SCROLL REVEAL ====================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Stop observing once the element has appeared
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  // Fallback for browsers without IntersectionObserver
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}


// ==================== KEYBOARD ACCESSIBILITY ====================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mainNav?.classList.contains("nav-open")) {
    mainNav.classList.remove("nav-open");

    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open menu");

    menuButton?.focus();
  }
});


// ==================== INTERNSHIP ROADMAP ====================

const internshipTracks = {
  dataAnalytics: [
    {
      number: 1,
      title: "Data Cleaning Basics",
      day: 1,
      description:
        "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
      difficulty: "Beginner",
    },
    {
      number: 2,
      title: "Formulas & Pivot Tables",
      day: 4,
      description:
        "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
      difficulty: "Beginner",
    },
    {
      number: 3,
      title: "Data Visualization",
      day: 8,
      description:
        "Create charts and a simple dashboard that communicate useful insights from a dataset.",
      difficulty: "Beginner → Intermediate",
    },
    {
      number: 4,
      title: "Introduction to SQL",
      day: 11,
      description:
        "Practice basic SQL queries and use them to answer real-world questions about data.",
      difficulty: "Beginner → Intermediate",
    },
    {
      number: 5,
      title: "SQL Joins & Aggregations",
      day: 15,
      description:
        "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
      difficulty: "Intermediate",
    },
    {
      number: 6,
      title: "Lookup Functions & Data Wrangling",
      day: 19,
      description:
        "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
      difficulty: "Intermediate",
    },
    {
      number: 7,
      title: "Mini Analysis Project",
      day: 22,
      description:
        "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
      difficulty: "Intermediate",
    },
    {
      number: 8,
      title: "Capstone Project",
      day: 26,
      description:
        "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
      difficulty: "Intermediate",
    },
  ],

  webDevelopment: [
    {
      number: 1,
      title: "Build the TechBridge Homepage",
      day: 1,
      description:
        "Create the first version of the TechBridge website using HTML and CSS.",
      difficulty: "Beginner",
    },
    {
      number: 2,
      title: "Build the TechBridge Programs Experience",
      day: 4,
      description:
        "Create a Programs experience presenting TechBridge's available learning programs.",
      difficulty: "Beginner",
    },
    {
      number: 3,
      title: "Build the Internship Tasks Experience",
      day: 8,
      description:
        "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
      difficulty: "Beginner → Intermediate",
    },
    {
      number: 4,
      title: "Build an Interactive Internship Roadmap",
      day: 11,
      description:
        "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
      difficulty: "Beginner → Intermediate",
    },
    {
      number: 5,
      title: "Build the Intern Registration Experience",
      day: 15,
      description:
        "Create a professional registration and onboarding interface for TechBridge interns.",
      difficulty: "Intermediate",
    },
    {
      number: 6,
      title: "Build the Task Submission System",
      day: 19,
      description:
        "Create an interface through which interns can prepare and submit their task work.",
      difficulty: "Intermediate",
    },
    {
      number: 7,
      title: "Build the Intern Dashboard",
      day: 22,
      description:
        "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
      difficulty: "Intermediate",
    },
    {
      number: 8,
      title: "Build the Complete TechBridge Internship Platform",
      day: 26,
      description:
        "Combine the different components created during the internship into a complete TechBridge platform.",
      difficulty: "Intermediate",
    },
  ],
};


// ==================== ROADMAP DISPLAY ====================

const trackButtons = document.querySelectorAll(".track-button");
const taskList = document.querySelector("#task-list");
const selectedTrack = document.querySelector("#selected-track");

function displayTrack(trackName) {
  if (!taskList || !selectedTrack) {
    return;
  }

  const tasks = internshipTracks[trackName];

  if (!tasks) {
    return;
  }

  selectedTrack.textContent =
    trackName === "dataAnalytics"
      ? "Data Analytics"
      : "Web Development";

  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskCard = document.createElement("article");

    taskCard.className = "roadmap-task-card";

    taskCard.innerHTML = `
      <div class="roadmap-task-number">
        ${String(task.number).padStart(2, "0")}
      </div>

      <div class="roadmap-task-content">

        <div class="roadmap-task-meta">
          <span>DAY ${String(task.day).padStart(2, "0")}</span>
          <span>${task.difficulty}</span>
        </div>

        <h3>${task.title}</h3>

        <p>${task.description}</p>

      </div>
    `;

    taskList.appendChild(taskCard);
  });
}


// ==================== TRACK SWITCHING ====================

trackButtons.forEach((button) => {
  button.addEventListener("click", () => {

    const selectedTrackName = button.dataset.track;

    trackButtons.forEach((trackButton) => {
      trackButton.classList.remove("active");
    });

    button.classList.add("active");

    displayTrack(selectedTrackName);
  });
});


// ==================== INITIAL TRACK ====================

displayTrack("webDevelopment");