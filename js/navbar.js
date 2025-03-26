document.addEventListener('DOMContentLoaded', function() {
	// Select all dropdown elements
	const dropdowns = document.querySelectorAll('.dropdown');
	const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
	const dropdownMenus = document.querySelectorAll('.dropdown-menu');
	
	// Set hover behavior for desktop (width > 992px)
	function setupDesktopHover() {
	  // Remove click event handlers if they exist
	  dropdownToggles.forEach(toggle => {
		toggle.removeEventListener('click', handleClick);
		toggle.removeAttribute('data-bs-toggle');
	  });
	  
	  // Add hover event handlers
	  dropdowns.forEach(dropdown => {
		dropdown.addEventListener('mouseenter', handleMouseEnter);
		dropdown.addEventListener('mouseleave', handleMouseLeave);
	  });
	  
	  // Add event handlers for dropdown menus
	  dropdownMenus.forEach(menu => {
		menu.addEventListener('mouseenter', handleMenuEnter);
		menu.addEventListener('mouseleave', handleMenuLeave);
	  });
	}
	
	// Set click behavior for mobile (width <= 992px)
	function setupMobileClick() {
	  // Remove hover event handlers
	  dropdowns.forEach(dropdown => {
		dropdown.removeEventListener('mouseenter', handleMouseEnter);
		dropdown.removeEventListener('mouseleave', handleMouseLeave);
	  });
	  
	  // Add click event handlers
	  dropdownToggles.forEach(toggle => {
		toggle.setAttribute('data-bs-toggle', 'dropdown');
		toggle.addEventListener('click', handleClick);
	  });
	  
	  // Remove menu event handlers
	  dropdownMenus.forEach(menu => {
		menu.removeEventListener('mouseenter', handleMenuEnter);
		menu.removeEventListener('mouseleave', handleMenuLeave);
	  });
	}
	
	// Event handler functions
	function handleMouseEnter(e) {
	  const dropdown = this;
	  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
	  
	  // Close all other dropdowns at the same level
	  if (dropdown.parentElement.classList.contains('dropdown-menu')) {
		// For nested dropdowns, only close siblings
		const siblings = Array.from(dropdown.parentElement.children)
		  .filter(child => child !== dropdown && child.classList.contains('dropdown'));
		siblings.forEach(sib => {
		  sib.classList.remove('show');
		  const sibMenu = sib.querySelector('.dropdown-menu');
		  if (sibMenu) sibMenu.classList.remove('show');
		});
	  } else {
		// For top-level dropdowns, close other top-level dropdowns
		const topLevelDropdowns = document.querySelectorAll('.navbar-nav > .dropdown');
		topLevelDropdowns.forEach(item => {
		  if (item !== dropdown) {
			item.classList.remove('show');
			const itemMenu = item.querySelector('.dropdown-menu');
			if (itemMenu) itemMenu.classList.remove('show');
		  }
		});
	  }
	  
	  // Open this dropdown
	  dropdown.classList.add('show');
	  if (dropdownMenu) dropdownMenu.classList.add('show');
	}
	
	function handleMouseLeave(e) {
	  const dropdown = this;
	  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
	  
	  // Only close if mouse leaves both the button and menu
	  if (!dropdown.contains(e.relatedTarget)) {
		dropdown.classList.remove('show');
		if (dropdownMenu) dropdownMenu.classList.remove('show');
	  }
	}
	
	function handleMenuEnter() {
	  // Keep parent dropdown marked as show
	  const dropdown = this.closest('.dropdown');
	  if (dropdown) dropdown.classList.add('show');
	  this.classList.add('show');
	}
	
	function handleMenuLeave(e) {
	  const menu = this;
	  const dropdown = menu.closest('.dropdown');
	  
	  if (!menu.contains(e.relatedTarget)) {
		if (dropdown) dropdown.classList.remove('show');
		menu.classList.remove('show');
	  }
	}
	
	function handleClick(e) {
	  // For mobile, let Bootstrap handle the click behavior
	  // We just need to prevent default if it's a # link
	  if (this.getAttribute('href') === '#') {
		e.preventDefault();
	  }
	}
	
	// Check screen size and set appropriate behavior
	function checkScreenSize() {
	  if (window.innerWidth > 992) {
		setupDesktopHover();
	  } else {
		setupMobileClick();
	  }
	}
	
	// Initialize
	checkScreenSize();
	
	// Re-check on resize
	let resizeTimer;
	window.addEventListener('resize', function() {
	  clearTimeout(resizeTimer);
	  resizeTimer = setTimeout(checkScreenSize, 250);
	});
	
	// Close all dropdowns when clicking outside
	document.addEventListener('click', function(e) {
	  if (!e.target.closest('.dropdown')) {
		dropdowns.forEach(dropdown => {
		  dropdown.classList.remove('show');
		  const menu = dropdown.querySelector('.dropdown-menu');
		  if (menu) menu.classList.remove('show');
		});
	  }
	});
  });