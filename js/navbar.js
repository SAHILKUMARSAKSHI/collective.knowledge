/* Navbar toggler */
const toggleBtn = document.querySelector(".navbar-toggler");
const navbarNav = document.querySelector(".navbar-nav");
const navCloseBtn = document.querySelector(".btn-nav-close");

toggleBtn.addEventListener("click", () => {
	navbarNav.classList.toggle("active");
});
navCloseBtn.addEventListener("click", () => {
	navbarNav.classList.remove("active");
});

/* Search popup */
const searchBtn = document.querySelector(".btn-search");
const searchBtnClose = document.querySelector(".btn-search-close");
const searchPopup = document.querySelector(".search-popup");

searchBtn.addEventListener("click", () => {
	searchPopup.classList.toggle("active");
});
searchBtnClose.addEventListener("click", () => {
	searchPopup.classList.remove("active");
});

/* Add icon on .nav-item if dropdown exists */
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
	const hasDropdowns = item.querySelector(".dropdown") !== null;
	if (hasDropdowns) {
		item.classList.add("icon");
	}
});
