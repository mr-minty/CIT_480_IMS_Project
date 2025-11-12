let i = 0;
let cooldown = false;
const fadeDuration = 100;

// Grab the card element
const card = document.getElementById("currentItem");

// --------------------
// Shared logic
// --------------------

// Fade + update contents
async function showItem(index) {
  cooldown = true;
  card.classList.add("fade-out");
  await sleep(fadeDuration);

  const item = inventory[index];
  document.getElementById("name").innerText = item.name;
  document.getElementById("sku").innerText = item.sku;
  document.getElementById("category").innerText = item.category;
  document.getElementById("supplier").innerText = item.supplier;
  document.getElementById("pricePerUnit").innerText = "price / " + item.unit;
  document.getElementById("price").innerText = "$" + item.price;
  document.getElementById("quantity").innerText = item.quantity;

  card.classList.remove("fade-out");
  card.classList.add("fade-in");
  await sleep(fadeDuration);
  card.classList.remove("fade-in");

  cooldown = false;
}

// Move forward / backward
async function nextItem() {
  if (cooldown || i >= inventory.length - 1) return;
  i++;
  await showItem(i);
}

async function prevItem() {
  if (cooldown || i <= 0) return;
  i--;
  await showItem(i);
}

// --------------------
// Event binding
// --------------------

const isDesktop = window.matchMedia("(pointer: fine)").matches;

if (isDesktop) {
  // Desktop: mouse wheel
  card.addEventListener("wheel", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY > 0) await nextItem();
    else if (e.deltaY < 0) await prevItem();
  }, { passive: false });

} else {
  // Mobile: vertical swipe
  let startY = 0;
  card.addEventListener("touchstart", e => startY = e.touches[0].clientY);
  card.addEventListener("touchend", async e => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;
    if (deltaY < -30) await nextItem();    // swipe up
    else if (deltaY > 30) await prevItem(); // swipe down
  });
}
