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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let i = 0;
let cooldown = false;
const cooldownPeriod = 0;
const fadeDuration = 100;

const card=document.getElementById("currentItem");
card.addEventListener("wheel", async (e) => {
  e.preventDefault();   // stops the page from scrolling
  e.stopPropagation();
  if (cooldown) return;

  cooldown = true;

  if(e.deltaY > 0 && i < inventory.length - 1) {
    i++;
  }
  else if (e.deltaY < 0 && i != 0) {
    i--;
  }
  else {
    cooldown = false;
    return;
  }

  // Fade out
  card.classList.add("fade-out");
  await sleep(fadeDuration);

  // Populate card with next items information
  let title = document.getElementById("name");
  title.innerText = inventory[i].name;
  let sku = document.getElementById("sku");
  sku.innerText = inventory[i].sku;
  let category = document.getElementById("category");
  category.innerText = inventory[i].category;
  let supplier = document.getElementById("supplier");
  supplier.innerText = inventory[i].supplier;
  let unit = document.getElementById("pricePerUnit");
  unit.innerText= "price / " + inventory[i].unit;
  let price = document.getElementById("price");
  price.innerText = "$" + inventory[i].price;
  let quantity = document.getElementById("quantity");
  quantity.innerText = inventory[i].quantity;

  // Fade back in
  card.classList.remove("fade-out");
  card.classList.add("fade-in");
  await sleep(fadeDuration);

  // Clean up
  card.classList.remove("fade-in");

  await sleep(cooldownPeriod);
  cooldown = false;
}, { passive : false });




/*
let visibleIndices = [0, 1, 2];

function showCards() {
  visibleIndices.forEach((i, idx) => {
    const card = document.querySelector(`#card${idx}`);
    card.querySelector('.card-title').textContent = inventory[i].name;
    card.querySelector('.card-text').textContent = inventory[i].sku;
  });
}

function rotateCards() {
  visibleIndices.push((visibleIndices.shift() + 3) % inventory.length);
  showCards();
}

setInterval(rotateCards, 3000);
*/