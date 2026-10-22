/* =====================================
   PRIYANKA PORTFOLIO - SCRIPT.JS
===================================== */

// 1. MOBILE NAVIGATION MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a navigation link

navItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});


// 2. HIGHLIGHT THE CURRENT NAVIGATION LINK

const sections = document.querySelectorAll(
    "main section[id], header[id]"
);

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navItems.forEach(function (link) {
        const isActive =
            link.getAttribute("href") === "#" + currentSection;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


// 3. PROJECT FILTER BUTTONS

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedFilter = button.dataset.filter;

        // Update selected filter button
        filterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        // Show matching project cards
        projectCards.forEach(function (card) {
            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {
                card.hidden = false;
            } else {
                card.hidden = true;
            }
        });
    });
});


// 4. EXPAND AND COLLAPSE PROJECT DETAILS

const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".project-card");
        const details = card.querySelector(".project-details");

        const isExpanded =
            button.getAttribute("aria-expanded") === "true";

        details.hidden = isExpanded;
        button.setAttribute("aria-expanded", String(!isExpanded));

        button.innerHTML = isExpanded
            ? 'View details <span aria-hidden="true">↗</span>'
            : 'Hide details <span aria-hidden="true">↑</span>';
    });
});


// 5. CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all the fields.";
        formStatus.style.color = "#c0392b";
        return;
    }

    // The browser validates the email input type automatically.
    // This form does not send messages to a server.

    formStatus.textContent =
        "Thank you, " + name +
        "! Your form has been checked. No message was sent.";

    formStatus.style.color = "#267444";

    contactForm.reset();
});


// 6. BACK TO TOP BUTTON

const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
}

window.addEventListener("scroll", toggleBackToTop);
toggleBackToTop();

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// 7. AUTOMATICALLY UPDATE THE FOOTER YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();
    /* =====================================
   8. DARK / LIGHT MODE
===================================== */

const themeToggle = document.getElementById("themeToggle");

// Load the saved theme, or use light mode by default
let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("priyanka-theme") || "light";
} catch (error) {
    savedTheme = "light";
}

// Apply the selected theme
function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    themeToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );
}

// Apply the saved theme when the page opens
applyTheme(savedTheme);

// Switch between dark and light modes
themeToggle.addEventListener("click", function () {
    const isDark = document.body.classList.contains("dark-mode");

    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);

    // Remember the selected theme for the next visit
    try {
        localStorage.setItem("priyanka-theme", newTheme);
    } catch (error) {
        // Theme switching still works if storage is unavailable
    }
});