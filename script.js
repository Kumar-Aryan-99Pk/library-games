const dialog = document.querySelector(".add-dialog");
const openBtn = document.querySelector(".add-btn");
const form = document.querySelector("#addForm");
const container = document.querySelector(".container");

openBtn.addEventListener("click", () => {
    dialog.showModal();
});

dialog.addEventListener("close", () => {
    if (dialog.returnValue === "confirm") {
        const data = new FormData(form);
        const name = data.get("name");
        const url = data.get("imgsrc");
        const completed = data.get("played") === "on";
        console.log({ name, url, completed });
        form.reset();
        adddiv(name, url, completed);
    }
});

function adddiv(name, url, completed) {
    const card = document.createElement("div");
    card.className = "card";

    const imageDiv = document.createElement("div");
    imageDiv.className = "image";

    const img = document.createElement("img");
    img.src = url;
    img.alt = name;

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = name;

    imageDiv.appendChild(img);
    card.appendChild(imageDiv);
    card.appendChild(title);

    if (completed) {
        card.classList.add("completed");
    }

    container.appendChild(card);
}