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
const sections = document.querySelectorAll("section");
const navBarList = document.querySelector("#navbar__list");
myButton = document.getElementById("myBtn");
const navLinks = document.querySelectorAll(".navbar__link");

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

function createListItem(id, name) {
	const listItem = document.createElement("li");
	const anchor = document.createElement("a");
	anchor.textContent = name;
	anchor.href = "#" + id;
	anchor.id = "#" + id;
	listItem.classList.add("navbar__link");
	listItem.appendChild(anchor);
	navBarList.appendChild(listItem);
}

function createNav() {
	sections.forEach((section) => createListItem(section.id, section.dataset.nav));
}

// Add class 'active' to section when near top of viewport

function activateNavLinks(id) {
	const allNavLists = document.querySelectorAll(".navbar__link");
	allNavLists.forEach((navLink) => {
		if (navLink.childNodes[0].id.substring(1) === id) {
			console.log(true);
			navLink.childNodes[0].classList.add("active-class");
		} else {
			console.log(false);
			navLink.childNodes[0].classList.remove("active-class");
		}
	});
}
function activeClassAssign() {
	sections.forEach((section) =>
		window.addEventListener("scroll", function () {
			if (
				section.getBoundingClientRect().top + 200 < window.innerHeight &&
				section.getBoundingClientRect().bottom + 200 > window.innerHeight
			) {
				section.classList.add("your-active-class");
				activateNavLinks(section.id);
			} else {
				section.classList.remove("your-active-class");
			}
		})
	);
}

// Scroll to anchor ID using scrollTO event
window.onscroll = function () {
	scrollFunction();
};
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		myButton.style.display = "block";
	} else {
		myButton.style.display = "none";
	}
}
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
//Add Smooth scroll function to the anchor elements.
function smoothScroll() {
	const links = document.querySelectorAll("a");
	links.forEach((link) =>
		link.addEventListener("click", function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute("href")).scrollIntoView({
				behavior: "smooth",
			});
		})
	);
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
createNav();
document.querySelector(".navbar__menu").appendChild(navBarList);

// Scroll to section on link click
smoothScroll();

// Set sections as active
activeClassAssign();

// Make sections active
document.addEventListener("scroll", function () {
	activeClassAssign();
});
