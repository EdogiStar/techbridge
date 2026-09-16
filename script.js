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


/* =========================================
   TASK 5 — CHALLENGE HUB
========================================= */

const challenges = [
  {
    id: 1,
    title: "Sales Performance Analysis",
    track: "data-analytics",
    trackName: "Data Analytics",
    difficulty: "beginner",
    difficultyName: "Beginner",
    description:
      "Analyze a small sales dataset to identify trends, top-performing products, and monthly performance.",
    outcome:
      "A clear analysis showing key sales trends and business insights.",
    objective:
      "Use basic data cleaning and analysis techniques to understand sales performance.",
    skills: "Data cleaning, data analysis, and basic data visualization.",
    tools: "Excel, Google Sheets, or Python.",
    deliverable:
      "A cleaned dataset with a summary of important findings and visualizations.",
    time: "2–3 days",
  },

  {
    id: 2,
    title: "Customer Insights Analysis",
    track: "data-analytics",
    trackName: "Data Analytics",
    difficulty: "beginner",
    difficultyName: "Beginner",
    description:
      "Explore customer data to identify customer patterns, preferences, and useful business insights.",
    outcome:
      "A short customer insights report supported by simple charts.",
    objective:
      "Understand customer behaviour by organizing and analyzing customer information.",
    skills: "Data exploration, filtering, grouping, and visualization.",
    tools: "Excel, Google Sheets, or Power BI.",
    deliverable:
      "A customer analysis report containing key findings and visualizations.",
    time: "2–3 days",
  },

  {
    id: 3,
    title: "Business Performance Dashboard",
    track: "data-analytics",
    trackName: "Data Analytics",
    difficulty: "intermediate",
    difficultyName: "Intermediate",
    description:
      "Build a simple dashboard that presents important business performance metrics.",
    outcome:
      "An interactive dashboard that makes business performance easier to understand.",
    objective:
      "Transform raw business data into useful visual information for decision-making.",
    skills: "Data visualization, dashboard design, and basic analysis.",
    tools: "Power BI, Excel, or Tableau.",
    deliverable:
      "A dashboard displaying key metrics, charts, and business insights.",
    time: "3–5 days",
  },

  {
    id: 4,
    title: "Responsive Landing Page",
    track: "web-development",
    trackName: "Web Development",
    difficulty: "beginner",
    difficultyName: "Beginner",
    description:
      "Create a responsive landing page for a fictional product, service, or organization.",
    outcome:
      "A clean landing page that works across desktop, tablet, and mobile screens.",
    objective:
      "Practice creating structured and responsive web interfaces.",
    skills: "HTML5, CSS3, responsive design, and basic JavaScript.",
    tools: "HTML, CSS, JavaScript, and Git.",
    deliverable:
      "A responsive landing page with navigation, sections, calls-to-action, and a footer.",
    time: "2–3 days",
  },

  {
    id: 5,
    title: "Personal Portfolio Website",
    track: "web-development",
    trackName: "Web Development",
    difficulty: "intermediate",
    difficultyName: "Intermediate",
    description:
      "Build a professional portfolio website that showcases a developer's skills and projects.",
    outcome:
      "A responsive portfolio that can be shared with employers or clients.",
    objective:
      "Create a professional online presence using modern frontend development practices.",
    skills: "HTML, CSS, JavaScript, responsive design, and UI structure.",
    tools: "HTML, CSS, JavaScript, Git, and GitHub.",
    deliverable:
      "A multi-section portfolio containing an introduction, skills, projects, and contact section.",
    time: "3–5 days",
  },

  {
    id: 6,
    title: "Interactive Product Page",
    track: "web-development",
    trackName: "Web Development",
    difficulty: "intermediate",
    difficultyName: "Intermediate",
    description:
      "Create a product page with interactive elements that allow users to explore product information.",
    outcome:
      "A responsive product page with useful user interactions.",
    objective:
      "Practice combining HTML, CSS, and JavaScript to create an interactive web experience.",
    skills:
      "DOM manipulation, event handling, responsive design, and UI development.",
    tools: "HTML, CSS, JavaScript, and Git.",
    deliverable:
      "A product page with interactive buttons, product information, and responsive layouts.",
    time: "3–4 days",
  },
];


/* ==================== CHALLENGE ELEMENTS ==================== */

const challengeGrid = document.getElementById("challengeGrid");
const challengeCount = document.getElementById("challengeCount");
const noResults = document.getElementById("noResults");

const trackFilterButtons = document.querySelectorAll(
  "#trackFilters .filter-btn"
);

const difficultyFilterButtons = document.querySelectorAll(
  "#difficultyFilters .filter-btn"
);

const challengeSearch = document.getElementById("challengeSearch");
const resetFilters = document.getElementById("resetFilters");

const challengeModal = document.getElementById("challengeModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");


/* ==================== CHALLENGE FILTER STATE ==================== */

/*
  These names are intentionally different from
  the Roadmap's selectedTrack variable.
*/

let challengeTrack = "all";
let challengeDifficulty = "all";


/* ==================== RENDER CHALLENGES ==================== */

function renderChallenges(list) {
  if (!challengeGrid) return;

  challengeGrid.innerHTML = "";

  if (challengeCount) {
    challengeCount.textContent = list.length;
  }

  if (list.length === 0) {
    if (noResults) {
      noResults.hidden = false;
    }

    return;
  }

  if (noResults) {
    noResults.hidden = true;
  }

  list.forEach((challenge) => {
    const card = document.createElement("article");

    card.className = "challenge-card";

    card.innerHTML = `
      <div class="challenge-card-top">

        <span class="challenge-track">
          ${challenge.trackName}
        </span>

        <span class="challenge-difficulty ${challenge.difficulty}">
          ${challenge.difficultyName}
        </span>

      </div>

      <h2>${challenge.title}</h2>

      <p class="challenge-description">
        ${challenge.description}
      </p>

      <div class="challenge-outcome">

        <strong>Expected Outcome</strong>

        <p>${challenge.outcome}</p>

      </div>

      <button
        class="view-challenge-btn"
        data-id="${challenge.id}"
        type="button"
      >
        View Challenge
      </button>
    `;

    challengeGrid.appendChild(card);
  });
}


/* ==================== APPLY FILTERS ==================== */

function applyChallengeFilters() {
  const searchTerm = challengeSearch
    ? challengeSearch.value.trim().toLowerCase()
    : "";

  const filteredChallenges = challenges.filter((challenge) => {

    const trackMatches =
      challengeTrack === "all" ||
      challenge.track === challengeTrack;

    const difficultyMatches =
      challengeDifficulty === "all" ||
      challenge.difficulty === challengeDifficulty;

    const searchMatches =
      challenge.title.toLowerCase().includes(searchTerm) ||
      challenge.description.toLowerCase().includes(searchTerm) ||
      challenge.trackName.toLowerCase().includes(searchTerm);

    return (
      trackMatches &&
      difficultyMatches &&
      searchMatches
    );
  });

  renderChallenges(filteredChallenges);
}


/* ==================== TRACK FILTER ==================== */

trackFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {

    trackFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    challengeTrack = button.dataset.track;

    applyChallengeFilters();
  });
});


/* ==================== DIFFICULTY FILTER ==================== */

difficultyFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {

    difficultyFilterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    challengeDifficulty = button.dataset.difficulty;

    applyChallengeFilters();
  });
});


/* ==================== SEARCH ==================== */

if (challengeSearch) {
  challengeSearch.addEventListener(
    "input",
    applyChallengeFilters
  );
}


/* ==================== RESET FILTERS ==================== */

if (resetFilters) {
  resetFilters.addEventListener("click", () => {

    challengeTrack = "all";
    challengeDifficulty = "all";

    if (challengeSearch) {
      challengeSearch.value = "";
    }

    trackFilterButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.track === "all"
      );
    });

    difficultyFilterButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.difficulty === "all"
      );
    });

    applyChallengeFilters();
  });
}


/* ==================== CHALLENGE DETAILS MODAL ==================== */

function openChallengeModal(challengeId) {
  const challenge = challenges.find(
    (item) => item.id === challengeId
  );

  if (!challenge || !challengeModal || !modalBody) {
    return;
  }

  modalBody.innerHTML = `
    <span class="challenge-track">
      ${challenge.trackName}
    </span>

    <h2>${challenge.title}</h2>

    <span class="challenge-difficulty ${challenge.difficulty}">
      ${challenge.difficultyName}
    </span>

    <h3>Objective</h3>
    <p>${challenge.objective}</p>

    <h3>Skills Required</h3>
    <p>${challenge.skills}</p>

    <h3>Tools</h3>
    <p>${challenge.tools}</p>

    <h3>What You Need to Produce</h3>
    <p>${challenge.deliverable}</p>

    <h3>Expected Result</h3>
    <p>${challenge.outcome}</p>

    <h3>Estimated Time</h3>
    <p>${challenge.time}</p>
  `;

  challengeModal.hidden = false;
  document.body.style.overflow = "hidden";
}


function closeChallengeModal() {
  if (!challengeModal) return;

  challengeModal.hidden = true;
  document.body.style.overflow = "";
}


/* ==================== VIEW CHALLENGE ==================== */

if (challengeGrid) {
  challengeGrid.addEventListener("click", (event) => {

    const button = event.target.closest(
      ".view-challenge-btn"
    );

    if (!button) return;

    const challengeId = Number(button.dataset.id);

    openChallengeModal(challengeId);
  });
}


/* ==================== CLOSE MODAL ==================== */

if (modalClose) {
  modalClose.addEventListener(
    "click",
    closeChallengeModal
  );
}


if (modalOverlay) {
  modalOverlay.addEventListener(
    "click",
    closeChallengeModal
  );
}


/* ==================== INITIAL CHALLENGES ==================== */

if (challengeGrid) {
  renderChallenges(challenges);
}