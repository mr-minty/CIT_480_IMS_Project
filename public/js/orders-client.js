// Order details dropdown
document.querySelectorAll(".order-row").forEach(row => {
  row.addEventListener("click", () => {
    const details = row.nextElementSibling;
    details.classList.toggle("show");
  });
});

//Get User name from user_id of order


//Mark item as picked
document.querySelectorAll(".item-submit-button").forEach(button => {
  button.addEventListener("click", () => {
    const submitMessage = button.nextElementSibling;
    submitMessage.classList.toggle("show");

    const icon = button.querySelector("i");
    icon.classList.toggle("active")
    button.classList.toggle("active");
  });
});