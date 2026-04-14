const sortButton = document.getElementById("sortButton");
const itemsList = document.getElementById("itemsList");

sortButton.addEventListener("click", async () => {
    const sortColumn = document.getElementById("sortColumn").value;
    const sortOrder = document.getElementById("sortOrder").value;
    const data = {
        column: sortColumn,
        order: sortOrder
    }

    
    const res = await fetch("/api/retrieve-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "same-origin",
    });

    if(!res.ok) {
        console.error("Server error:", res.status);
        return;
    }
    //Begin old display fade
    itemsList.style.opacity = "0"; 
    
    const retrievedItems = await res.json();
    
    //Insert new items and fade in
    setTimeout(() => {
        //Clear Current sort
        itemsList.innerHTML = "";

        //Rebuild items list
        retrievedItems.forEach(retrievedItem => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${String(retrievedItem.sku).padStart(3, "0")}</td>
                <td>${retrievedItem.name}</td>
                <td>${retrievedItem.category}</td> 
                <td>${retrievedItem.supplier}</td>
                <td>$${retrievedItem.price} / ${retrievedItem.unit}</td>
                <td>${retrievedItem.quantity}</td>
            `;
            itemsList.appendChild(row);
            //Fade in
            itemsList.style.opacity = "1";
        });
    }, 150);

});