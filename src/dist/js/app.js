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
});

//   sidebar
window.addEventListener("alpine:init", function () {
  Alpine.store("sidebar", {
    open: true,
    toggle() {
      this.open = !this.open;
    },
  });

  Alpine.store("activeLink", {
    name: "#about",
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
    const linkName = anchorTag.getAttribute("href");

    const currentUrl = document.URL;
    if (currentUrl.search(linkName) > 0) {
      Alpine.store("activeLink").name = linkName;
    }

    anchorTag.addEventListener("click", function (e) {
      Alpine.store("activeLink").name = linkName;
      sidebarHideOnMobile(windowWidthLg);
    });
  });
});
