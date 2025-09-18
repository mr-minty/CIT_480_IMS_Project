console.log("login-client.js running");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const res = await fetch("/api/login", {
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
    const data = await res.json();
    document.getElementById("errorMsg").innerText = data.error;
  } else {
    window.location.href = "/dashboard"; // redirect on success

    //document.getElementById("errorMsg").innerText = res.getHeaders;
  }
});