const button = document.getElementById("addItemButton");
buttonTextOriginal = button.innerText;
buttonTextAlternate = "Cancel";
const table = document.getElementById("inventoryTable");
const newItemForm = document.getElementById("newItemForm");
const submitNewItemButton = document.getElementById("submitNewItemButton");
const scrollbar = document.getElementById("tableScrollContainer");
let buttonState = 0;
let scrollbarPosition;
const responseMessage = document.getElementById("responseMessage");
let successMessage = "Item added successfully";
let errorMessage = "Something went wrong, please try again";
let infoMessage = "Submitting item...";
const MESSAGE_TYPES = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info"
});

button.addEventListener("click", async () => {
if(buttonState === 0){
    setView();
} else {
    resetView();
  }
});

submitNewItemButton.addEventListener("click", async () => {
  submitNewItemButton.classList.add("pressed");
  setTimeout(() => { submitNewItemButton.classList.remove("pressed"); }, 150);
  //Get user entered item information
  const data = {
    name: document.getElementById("newItemName").value,
    category: document.getElementById("newItemCategory").value,
    supplier: document.getElementById("newItemSupplier").value,
    price: document.getElementById("newItemPrice").value,
    unit: document.getElementById("newItemUnit").value,
    quantity: document.getElementById("newItemQuantity").value
  };
  
  //Ensure all fields are defined
  if(!data.name || !data.category || !data.supplier || 
    !data.price || !data.unit || !data.quantity){
      //Display error message
      displayResponseMessage(MESSAGE_TYPES.ERROR, "Please ensure all fields are entered");
      return;
    }

  //Display info message on submit
  displayResponseMessage(MESSAGE_TYPES.INFO, infoMessage);
  try {
    const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "same-origin",
    });

    if(!res.ok){
      const errorData = await res.json();
      console.error("Server error:", res.status);
      //Display error message
      displayResponseMessage(MESSAGE_TYPES.ERROR, errorData.error || errorMessage);
      return;
    } 
    
    //Row Entered successfully, grab new row from DB
    const createdItem = await res.json();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${String(createdItem.sku).padStart(3, "0")}</td>
      <td>${createdItem.name}</td>
      <td>${createdItem.category}</td> 
      <td>${createdItem.supplier}</td>
      <td>$${createdItem.price} / ${createdItem.unit}</td>
      <td>${createdItem.quantity}</td>
    `;
    document.getElementById("itemsList").appendChild(row);
    
    //Reset view
    resetView();

    //Display success message
    displayResponseMessage(MESSAGE_TYPES.SUCCESS, successMessage);
    
  } catch (err) {
      //Display error message
      displayResponseMessage(MESSAGE_TYPES.ERROR, errorMessage);
  }
  
});

//Set the scrollbar to the bottom row and reveal the add item form
function setView() {
  buttonState = 1;
    //capture scroll height
    scrollbarPosition = scrollbar.scrollTop;
    button.innerText = buttonTextAlternate ;
    newItemForm.classList.remove("d-none");
    submitNewItemButton.classList.remove("d-none");
    scrollbar.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

//Reset the view back to the user's prior scroll-height, hide the add item form
function resetView() {
    buttonState = 0;
    button.innerText = buttonTextOriginal;
    newItemForm.classList.add("d-none");
    submitNewItemButton.classList.add("d-none");
    scrollbar.scrollTo({ behavior: 'smooth', top: scrollbarPosition });
}

//Takes a message type 
function displayResponseMessage(type, message) {
    responseMessage.classList.remove("fade-out", "fade-in", "success", "info", "error");;
    responseMessage.classList.add("fade-in");
    responseMessage.classList.add(type);
    responseMessage.innerText= message;

    setTimeout(() => {
        responseMessage.classList.add("fade-out");

      // After fade completes (~0.3s), hide/reset it completely
      setTimeout(() => {
        responseMessage.classList.remove("fade-out", "fade-in", "success", "info", "error");
        responseMessage.textContent = "";
      }, 300); // match your CSS transition time
    }, 2000);

}

//Empty the form after an invalid entry attempt
function resetNewItemForm(){
  const newItemForm = getElementById("newItemForm");
  
}

 