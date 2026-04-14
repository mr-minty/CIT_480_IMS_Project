const items = document.getElementsByClassName("inventory-list-item");
const modalEl = document.getElementById("itemModal");
const modal = new bootstrap.Modal(modalEl);

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", () => {

  // 1. get data
  const item = inventory[i];

  // 2. inject into modal
  document.getElementById("modalName").textContent = item.name;
  document.getElementById("modalSku").textContent = item.sku;
  document.getElementById("modalCategory").textContent = item.category;
  document.getElementById("modalSupplier").textContent = item.supplier;
  document.getElementById("modalPrice").textContent = item.price;
  document.getElementById("modalUnit").textContent = item.unit;
  document.getElementById("modalQuantity").textContent = item.quantity;

  // 3. show modal
  modal.show();
});
}




