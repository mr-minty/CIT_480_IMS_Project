let items = document.getElementsByClassName("inventory-row");
let counter = 0;

for(let i = 0; i < items.length; i++){
    items[i].addEventListener("click", async (e) =>{
        e.preventDefault();
        let row = e.target;
        counter++;
        console.clear();
        console.log(`Click counter: ${counter}`);
    });
}


