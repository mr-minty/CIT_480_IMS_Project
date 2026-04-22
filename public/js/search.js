const searchInput = document.getElementById("searchInput");

function filterInventory() {
  const query = searchInput.value.trim().toLowerCase();

  // Desktop table rows (Name column = index 1)
  const desktopRows = document.querySelectorAll("#itemsList .inventory-row");
  desktopRows.forEach((row) => {
    const name = row.children[1].textContent.trim().toLowerCase();
    row.style.display = name.startsWith(query) ? "" : "none";
  });

  // Mobile list items (first child = name)
  const mobileItems = document.querySelectorAll(".inventory-list-item");
  mobileItems.forEach((item) => {
    const name = item.children[0].textContent.trim().toLowerCase();
    item.style.display = name.startsWith(query) ? "" : "none";
  });
}

searchInput.addEventListener("input", filterInventory);