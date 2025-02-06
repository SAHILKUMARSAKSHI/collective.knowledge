(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
    }
  });

  // Dropdown on mouse hover
  // const $dropdown = $(".dropdown");
  // const $dropdownToggle = $(".dropdown-toggle");
  // const $dropdownMenu = $(".dropdown-menu");
  // const showClass = "show";

  // $(window).on("load resize", function () {
  //   if (this.matchMedia("(min-width: 992px)").matches) {
  //     $dropdown.hover(
  //       function () {
  //         const $this = $(this);
  //         $this.addClass(showClass);
  //         $this.find($dropdownToggle).attr("aria-expanded", "true");
  //         $this.find($dropdownMenu).addClass(showClass);
  //       },
  //       function () {
  //         const $this = $(this);
  //         $this.removeClass(showClass);
  //         $this.find($dropdownToggle).attr("aria-expanded", "false");
  //         $this.find($dropdownMenu).removeClass(showClass);
  //       }
  //     );
  //   } else {
  //     $dropdown.off("mouseenter mouseleave");
  //   }
  // });

  document.addEventListener('DOMContentLoaded', function() {
    // Toggle main dropdown
    var academicsDropdownToggle = document.querySelector('#academicsDropdown');
    var academicsDropdownMenu = academicsDropdownToggle.nextElementSibling;

    academicsDropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        if (academicsDropdownMenu.style.display === 'block') {
            academicsDropdownMenu.style.display = 'none';
        } else {
            academicsDropdownMenu.style.display = 'block';
        }
    });

    // Toggle nested dropdown for "People"
    var peopleDropdownToggle = document.querySelector('#peopleDropdown');
    var peopleDropdownMenu = peopleDropdownToggle.nextElementSibling;

    peopleDropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        if (peopleDropdownMenu.style.display === 'block') {
            peopleDropdownMenu.style.display = 'none';
        } else {
            peopleDropdownMenu.style.display = 'block';
        }
    });

    // Close dropdowns if clicked outside
    document.addEventListener('click', function(event) {
        if (!academicsDropdownToggle.contains(event.target) && !academicsDropdownMenu.contains(event.target)) {
            academicsDropdownMenu.style.display = 'none';
        }
        if (!peopleDropdownToggle.contains(event.target) && !peopleDropdownMenu.contains(event.target)) {
            peopleDropdownMenu.style.display = 'none';
        }
    });
});

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  const form = document.getElementById("form");
  const result = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = json.message;
          result.classList.remove("text-gray-500");
          result.classList.add("text-green-500");
        } else {
          console.log(response);
          result.innerHTML = json.message;
          result.classList.remove("text-gray-500");
          result.classList.add("text-red-500");
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
        }, 5000);
      });
  });
})(jQuery);
