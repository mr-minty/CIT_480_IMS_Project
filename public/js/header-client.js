const dropdownButton = document.getElementById("dropdownIcon");
const dropdownMenu = document.getElementById("dropdownMenu");
const headerWrapper = document.getElementById("headerWrapper");

// Check that this page allows the dropdown menu
if (dropdownButton && dropdownMenu && headerWrapper) {
  dropdownButton.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
    document.body.classList.toggle("menu-open");
  });

  document.addEventListener("click", (e) => {
    if (!headerWrapper.contains(e.target)) {
      dropdownMenu.classList.remove("show");
      document.body.classList.remove("menu-open");
    }
  });

  window.addEventListener("resize", () => {
    console.log("Viewport changed");
  });
}