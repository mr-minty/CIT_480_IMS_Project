// ---------- Event listeners ----------

// Order details dropdown
document.querySelectorAll(".order-row").forEach(row => {
  row.addEventListener("click", () => {
    const details = row.nextElementSibling;
    details.classList.toggle("show");
    row.classList.toggle("expanded");
  });
});

//Mark item as picked
document.querySelectorAll(".item-ready-button").forEach(button => {
  button.addEventListener("click", () => {
    const submitMessage = button.nextElementSibling;
    submitMessage.classList.toggle("show");
    const icon = button.querySelector("i");
    icon.classList.toggle("active")
    button.classList.toggle("active");
  });
});

//Assign order to the user
document.querySelectorAll(".assign-order-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const order_id = button.getAttribute("data-order-id");  
    
    const assignmentResult = await requestOrderAssignment(order_id);
    if (assignmentResult.success){
      //Fill in UI with temp values
      updateAssignmentUi(button, assignmentResult);
    }
  });
});

//Submit order as complete and update inventory quantities
document.querySelectorAll(".submit-order-btn").forEach(button => {
  button.addEventListener("click", async () => {

    if (!checkReadyButtons(button)) return;

    const card = button.closest(".order-card");

    // PHASE 1: immediately update UI
    showSubmittingState(card);

    const order_id = button.getAttribute("data-order-id");

    const submissionResult = await requestOrderSubmission(order_id);

    if (submissionResult.success) {
      // PHASE 3: success UI
      showSubmittedState(card);
    } else {
      // optional: revert UI
      showSubmitError(card);
    }
  });
});

// ---------- API functions ----------

async function requestOrderAssignment(order_id) {
  const res = await fetch(`/api/orders/${ order_id }/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin"
  });

  const data = await res.json();

  if (!res.ok) {
    console.log("error", data);
    return { success: false };
  }

  return data;
}

async function requestOrderSubmission(order_id) {
  const res = await fetch(`/api/orders/${ order_id }/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin"
  });

  const data = await res.json();

  if (!res.ok) {
    console.log("error", data);
    return { success: false };
  }

  return data;
}


// ---------- UI helpers ----------

//Transition UI from unassigned to assigned
function updateAssignmentUi(button, assignmentResult) {
  const card = button.closest(".order-card");
  card.querySelector(".order-row-status").textContent = 'assigned';
  card.querySelector(".order-row-status").classList.toggle("assigned")
  card.querySelector(".status").textContent = 'assigned';
  card.querySelector(".assigned-to").textContent = assignmentResult.name;
  card.querySelectorAll(".item-ready-button").forEach(btn => {
    btn.classList.remove("hidden-fade");
  //Reveal elements
  card.querySelector(".assign-order-btn").classList.add("hidden-fade");
  card.querySelector(".submit-order-btn").classList.remove("hidden-fade");
  card.querySelector(".assigned-at").classList.remove("hidden-display");
  });
}

//Display submission status and remove card if successful
function updateSubmissionUi(button, submissionResult) {
  const card = button.closest(".order-card");
  console.log("result: ", submissionResult.message);
  setTimeout(() => {

  }, 2000);
  if(submissionResult) card.remove();
}

//Display submitting state and indicate success or failure

//Submitting
function showSubmittingState(card) {
  const body = card.querySelector(".order-row-body");

  body.innerHTML = `
    <div class="submit-status">Submitting...</div>
  `;
}

//Submitted
function showSubmittedState(card) {
  const body = card.querySelector(".order-row-body");

  body.innerHTML = `
    <div class="submit-status success">Submitted ✔</div>
  `;

  // remove after delay
  setTimeout(() => {
    card.remove();
  }, 1000);
}

//Failed to submit
function showSubmitError(card) {
  const body = card.querySelector(".order-row-body");

  body.innerHTML = `
    <div class="submit-status error">Failed ❌</div>
  `;
}

//Ensure all items have been picked before requesting submission
function checkReadyButtons(button) {
  const orderCard = button.closest(".order-card");
  const itemButtons = orderCard.querySelectorAll(".item-ready-button");

  const allReady = Array.from(itemButtons).every(btn =>
    btn.classList.contains("active")
  );

  if (!allReady) {
    alert("All items must be picked before submitting.");
    return false;
  }

  return true;
}