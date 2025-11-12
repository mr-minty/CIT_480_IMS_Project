const form = document.getElementById("changeRequestForm");
const msg = document.getElementById("responseMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.className = "";
  msg.classList.add("show");
  msg.textContent = "Submitting...";

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  try {
    const res = await fetch("/api/change-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "same-origin",
      cookie: {
        httpOnly: true,
        secure: false,     // allow cookies over http://localhost
        sameSite: 'lax'    // more permissive
      }
    });

    if (!res.ok) {
      const text = await res.text();   // don’t assume JSON
      console.error("Server error:", res.status, text);

      msg.textContent="Something went wrong, please try again.";
      msg.classList.add("error");
      return;
    }

    msg.textContent="Request submitted, thank you.";
    msg.classList.add("success");

    //Reset changeRequestForm
    form.reset();
    
    //Clear responseMessage
    // Wait 3 seconds, then start fading out
    setTimeout(() => {
        msg.classList.add("fade-out");

      // After fade completes (~0.3s), hide/reset it completely
      setTimeout(() => {
        msg.className = "";
        msg.textContent = "";
      }, 300); // match your CSS transition time
    }, 3000);


  } catch(err) {
    console.error("Fetch failed:", err);
    msg.textContent = "Network error — please try again.";
    msg.classList.add("error");
  }
  
});