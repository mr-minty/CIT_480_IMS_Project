
let i = 0;
let cooldown = false;
const cooldownPeriod = 0;
const fadeDuration = 100;
const isDesktop = window.matchMedia("(pointer: fine)").matches;

const card=document.getElementById("currentItem");

if(isDesktop){ 
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
}
else {
    let startY = 0;
    card.addEventListener("touchstart", e => startY = e.touches[0].clientY);
    card.addEventListener("touchend", e => {
        const endY = e.changedTouches[0].clientY;
        const deltaY = endY - startY;
        if (deltaY < -30) nextItem();
        else if (deltaY > 30) prevItem();
    });
}
