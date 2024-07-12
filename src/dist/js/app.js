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

  const lightThemeTag = document.querySelectorAll(".light_theme_icon");
  const darkThemeTag = document.querySelectorAll(".dark_theme_icon");

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    darkThemeTag.forEach((dark) => dark.classList.add("!hidden"));
    lightThemeTag.forEach((light) => light.classList.remove("!hidden"));
  } else {
    document.documentElement.classList.remove("dark");
    lightThemeTag.forEach((light) => light.classList.add("!hidden"));
    darkThemeTag.forEach((dark) => dark.classList.remove("!hidden"));
  }
}

// when page load
window.addEventListener("load", function () {
  toggleTheme(true);
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
});
