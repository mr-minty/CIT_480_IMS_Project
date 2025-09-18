document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
								//Verify inputs before sending to server
  let hasError = false;

  if(!data.username){
      document.getElementById("usernameError").innerText = "Please enter a valid username";
      hasError = true;
  } else if(data.username.length < 6 || data.username.length > 16){
      document.getElementById("usernameError").innerText = "Username must be between 6-16 characters";
      hasError = true;
  } else if(data.username)
  

  if(hasError) return;
 
   const res = await fetch("/api/register", {    		//Inputs verified, send to server
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorData = await res.json();
 
    for(const [field, msg] of Object.entries(errorData)) {
       const el = document.getElementById(field + "Error");
       if (el) el.innerText = msg;
    }
  } else {
    window.location.href = "/"; // redirect on success
  }
  
});