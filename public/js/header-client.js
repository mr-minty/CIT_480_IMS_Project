const dropdownButton = document.getElementById("dropdownIcon");
const dropdownMenu = document.getElementById("dropdownMenu");

dropdownButton.addEventListener("click", async (e) => {
  e.stopPropagation();

  dropdownMenu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if(!dropdownnWrapper.contains(e.target)){
    dropdownMenu.classList.remove("show");
  }
});