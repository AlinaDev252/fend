/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.getElementsByTagName("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const createNavLists = () => {
	for (section of sections) {
		const navList = document.getElementById("navbar__list");
		const navItem = document.createElement("li");
		const navItemLink = document.createElement("a");
		navItemLink.textContent = section.id;
		// append link to the navItem
		navItem.appendChild(navItemLink);
		navList.appendChild(navItem);
	}
};

// Add class 'active' to section when near top of viewport
const makeActive = () => {
	const section = document.querySelectorAll("section");
	for (const active of section) {
		const position = active.getBoundingClientRect();
		if (position.top <= 150 && position.bottom >= 150) {
			// Apply active state on the current section and the corresponding Nav link.
			active.classList.add("your-active-class");
		} else {
			// Remove active state from other section and corresponding Nav link.
			active.classList.remove("your-active-class");
		}
	}
};

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
createNavLists();

// Scroll to section on link click

// Set sections as active

// Make sections active
document.addEventListener("scroll", function () {
	makeActive();
});
