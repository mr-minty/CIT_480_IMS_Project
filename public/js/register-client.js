document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
								//Verify inputs before sending to server
  let hasError = false;

  //Form user input validation
  if(!data.username){
      document.getElementById("usernameError").innerText = "Please enter a valid username";
      hasError = true;
  } else if(data.username.length < 6 || data.username.length > 16){
      document.getElementById("usernameError").innerText = "Username must be between 6-16 characters";
      hasError = true;
  } else if(data.username)
  
  //Return error message if user submits any
  if(hasError) return;
 
  //No input errors sending user registration info to /api/register
   const res = await fetch("/api/register", {    		//Inputs verified, send to server
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  
  //Check for a successfull 200 range response code
  if (!res.ok) {
    const errorData = await res.json();
 
    for(const [field, msg] of Object.entries(errorData)) {
       console.log(errorData);
       const el = document.getElementById(field + "Error");
       if (el) el.innerText = msg;
    }
  } else {
    window.location.href = "/"; // redirect on success
  }
  
});