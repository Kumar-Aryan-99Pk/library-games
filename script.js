const dialog = document.querySelector(".add-dialog");
const openBtn = document.querySelector(".add-btn");
const form = document.querySelector("#addForm");
const container = document.querySelector(".container");

openBtn.addEventListener("click", () => {
    dialog.showModal();
});
const gameslib=[];

class Game{
    constructor(name,url,completed){
        this.id=crypto.randomUUID();
        this.name=name;
        this.url=url;
        this.completed=completed;
    }
}

dialog.addEventListener("close", () => {
    if (dialog.returnValue === "confirm") {
        const data = new FormData(form);
        const name = data.get("name");
        const url = data.get("imgsrc");
        const completed = data.get("played") === "on";
        console.log({ name, url, completed });
        form.reset();
        const newgame=new Game(name,url,completed);
        gameslib.push(newgame);
        adddiv(newgame);
    }
});

function adddiv(newgame) {
    const card = document.createElement("div");
    card.className = "card";

    const imageDiv = document.createElement("div");
    imageDiv.className = "image";

    const img = document.createElement("img");
    img.src = newgame.url;
    img.alt = newgame.name;
    img.height=370;
    img.onerror = () => {img.src = "./images/placeholder.jpg"};
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = newgame.name;

    imageDiv.appendChild(img);
    card.appendChild(imageDiv);
    card.appendChild(title);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    card.appendChild(deleteBtn);

    if (newgame.completed) {
        card.classList.add("completed");
    }

    container.appendChild(card);
}

container.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");

  if (!deleteBtn) return;

  const card = deleteBtn.closest(".card");
  card.remove();
});
