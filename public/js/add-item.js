
//-------------------
// ASSIGNMENTS
//-------------------

const addItemButton = document.getElementById("addItemButton");
buttonTextOriginal = addItemButton.innerText;
buttonTextAlternate = "Cancel";
const select = document.getElementById("addItemDropdowmButton");
const dropdown = document.getElementById("addItemDropdowm");
const table = document.getElementById("inventoryTable");
const manualForm = document.getElementById("manualForm");
const smartForm = document.getElementById("smartForm");
const smartFillButton =document.getElementById("smartFillButton");
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
const smartAddOption = document.getElementById("smartAddOption");
const manualAddOption = document.getElementById("manualAddOption");
let addMode = "smart";


//-------------------
// EVENTS
//-------------------


smartAddOption.addEventListener("click", (e) => {
  e.preventDefault();
  addMode = "smart";

  if (buttonState === 1) {
    showCurrentForm();
  }
});

manualAddOption.addEventListener("click", (e) => {
  e.preventDefault();
  addMode = "manual";

  if (buttonState === 1) {
    showCurrentForm();
  }
});

//Handle UI after user clicks "add item"
addItemButton.addEventListener("click", async () => {
  if(buttonState === 0){
      setView();
  } else {
      resetView();
  }
});

//Extracting data from user prompt
smartFillButton.addEventListener("click", async () => {
  //Display info message on fill
  displayResponseMessage(MESSAGE_TYPES.INFO, "Filling out fields, one moment");
  //Get user prompt 
  const userPrompt = document.getElementById("newItemPrompt").value;
  //Send to OpenAI API endpoint for VALUES extraction
  try {
    const res = await fetch("/api/ai/add-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt }),
      credentials: "same-origin",
    });

    //Get VALUES
    const { name, category, supplier, price, unit, quantity }= await res.json();

    //Add VALUES to UI display for user check
    document.getElementById("newItemName").value = name;
    document.getElementById("newItemCategory").value = category;
    document.getElementById("newItemSupplier").value = supplier;
    document.getElementById("newItemPrice").value = price;
    document.getElementById("newItemUnit").value = unit;
    document.getElementById("newItemQuantity").value = quantity;

    //Reveal smart-filled manual entry form
    smartForm.classList.add("d-none");
    manualForm.classList.remove("d-none");


  } catch (err) {
      console.log(err);
      displayResponseMessage(MESSAGE_TYPES.ERROR, errorMessage);
      return;
  }
});


//Submitting user data to server
submitNewItemButton.addEventListener("click", async () => {
  let data;
  submitNewItemButton.classList.add("pressed");
  setTimeout(() => { submitNewItemButton.classList.remove("pressed"); }, 150);
  //Get user entered item information
  data = {
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
    const res = await fetch("/api/add-item", {
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
      //Display and log error message
      console.log("error: ", err);
      displayResponseMessage(MESSAGE_TYPES.ERROR, errorMessage);
  }
  
});


//-------------------
// FUNCTIONS
//-------------------


//Set the scrollbar to the bottom row and reveal the add item form
function setView() {
  buttonState = 1;
  scrollRatio = scrollbar.scrollTop / (scrollbar.scrollHeight - scrollbar.clientHeight || 1);
  addItemButton.innerText = buttonTextAlternate;

  showCurrentForm();

  submitNewItemButton.classList.remove("d-none");
  scrollbar.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" });
}

//Reset the view back to the user's prior scroll-height, hide the add item form
function resetView() {
  buttonState = 0;
  addItemButton.innerText = buttonTextOriginal;

  smartForm.classList.add("d-none");
  manualForm.classList.add("d-none");
  submitNewItemButton.classList.add("d-none");

  const maxScroll = scrollbar.scrollHeight - scrollbar.clientHeight;
  scrollbar.scrollTo({ behavior: "smooth", top: scrollRatio * maxScroll });
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

function showCurrentForm() {
  if (addMode === "manual") {
    manualForm.classList.remove("d-none");
    smartForm.classList.add("d-none");
  } else {
    smartForm.classList.remove("d-none");
    manualForm.classList.add("d-none");
  }
}

//Empty the form after an invalid entry attempt
function resetNewItemForm(){
  const newItemForm = getElementById("newItemForm");
  
}
