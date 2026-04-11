const button = document.getElementById("addItemButton");
const table = document.getElementById("inventoryTable");
const newItemForm = document.getElementById("newItemForm");
const submitNewItemButton = document.getElementById("submitNewItemButton");
const scrollbar = document.getElementById("tableScrollContainer");
let buttonState = 0;
let scrollbarPosition = 0;



button.addEventListener("click", async (e) => {
if(buttonState === 0){
    buttonState = 1;
    button.innerText = "Cancel";
    newItemForm.classList.remove("d-none");
    submitNewItemButton.classList.remove("d-none");
    scrollbar.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
} else {
    buttonState = 0;
    button.innerText = "New Item";
    newItemForm.classList.add("d-none");
    submitNewItemButton.classList.add("d-none");
    scrollbar.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
});

submitNewItemButton.addEventListener("click", () => {
  const data = {
    name: document.getElementById("newItemName").value,
    category: document.getElementById("newItemCategory").value,
    supplier: document.getElementById("newItemSupplier").value,
    price: document.getElementById("newItemPrice").value,
    quantity: document.getElementById("newItemQuantity").value
  };

  console.log(data);
  
});