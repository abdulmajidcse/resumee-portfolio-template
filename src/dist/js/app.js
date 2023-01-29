// set theme
function toggleTheme(dontChange = false) {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem(
      "theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }

  if (!dontChange) {
    if (localStorage.getItem("theme") === "dark") {
      // set light theme
      localStorage.setItem("theme", "light");
    } else {
      // set dark theme
      localStorage.setItem("theme", "dark");
    }
  }

  const lightThemeTag = document.getElementById("light_theme_icon");
  const darkThemeTag = document.getElementById("dark_theme_icon");

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    darkThemeTag.classList.add("!hidden");
    lightThemeTag.classList.remove("!hidden");
  } else {
    document.documentElement.classList.remove("dark");
    lightThemeTag.classList.add("!hidden");
    darkThemeTag.classList.remove("!hidden");
  }
}

// when page load
window.addEventListener("load", function () {
  toggleTheme(true);

  const sections = document.querySelectorAll(".section");
  sections.forEach(function (section) {
    if (section.hasAttribute("id")) {
      const linkName = `#${section.getAttribute("id")}`;
      // We are creating a new IntersectionObserver instance
      let observerInit = new IntersectionObserver(
        (entries, observer) => {
          // This takes a callback function that receives two arguments: the elements list and the observer instance.
          entries.forEach((entry) => {
            // `entry.isIntersecting` will be true if the element is visible
            if (entry.isIntersecting) {
              const sidebarLinks = document.querySelectorAll("a.scrollspy");
              sidebarLinks.forEach(function (sidebarLink) {
                if (sidebarLink.getAttribute("href") == linkName) {
                  sidebarLink.classList.add("active");
                } else {
                  sidebarLink.classList.remove("active");
                }
              });
            }
          });
        },
        { rootMargin: "-300px 0px -50px 0px" }
      );
      // Adding the observer to the element
      observerInit.observe(section);
    }
  });
});

//   sidebar
window.addEventListener("alpine:init", function () {
  Alpine.store("sidebar", {
    open: true,
    toggle() {
      this.open = !this.open;
    },
  });

  function sidebarHideOnMobile(e) {
    if (e.matches) {
      // in lg screen
      Alpine.store("sidebar").open = true;
    } else {
      // in less than lg screen
      Alpine.store("sidebar").open = false;
    }
  }

  const windowWidthLg = window.matchMedia("(min-width: 1024px)");
  windowWidthLg.addEventListener("change", sidebarHideOnMobile);

  sidebarHideOnMobile(windowWidthLg);

  // scrollspy fuctionality
  const scrollspys = document.querySelectorAll("a.scrollspy");
  scrollspys.forEach(function (anchorTag) {
    anchorTag.addEventListener("click", function (e) {
      sidebarHideOnMobile(windowWidthLg);
    });
  });
});
