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

//submit order as complete
document.querySelectorAll(".submit-order-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const order_id = button.getAttribute("data-order-id");

    const submissionResult = await requestOrderSubmission(order_id);
    if(submissionResult.success){
      //Move the order to the completed section
      updateSubmissionUi(button, submissionResult);
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

function updateAssignmentUi(button, assignmentResult) {
  button.closest(".order-card").querySelector(".order-row-status").textContent = 'assigned';
  button.closest(".order-card").querySelector(".order-row-status").classList.toggle("assigned")
  button.closest(".order-card").querySelector(".status").textContent = 'assigned';
  button.closest(".order-card").querySelector(".assigned-to").textContent = assignmentResult.name;
}

function updateSubmissionUi(button, submissionResult) {
  console.log("result: ", submissionResult.message);
}