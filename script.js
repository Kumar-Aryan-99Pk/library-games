const dialog = document.querySelector(".add-dialog");
const openBtn = document.querySelector(".add-btn");
const form = document.querySelector("#addForm");
const container = document.querySelector(".container");

openBtn.addEventListener("click", () => {
    dialog.showModal();
});
let gameslib = [];

class Game {
    constructor(name, url, completed) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.url = url;
        this.completed = completed;
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
        const newgame = new Game(name, url, completed);
        gameslib.push(newgame);
        saveToLocalStorage();
        adddiv(newgame);
    }
});

function adddiv(newgame) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = newgame.id;
    const imageDiv = document.createElement("div");
    imageDiv.className = "image";

    const img = document.createElement("img");
    img.src = newgame.url;
    img.alt = newgame.name;
    img.height = 370;
    img.onerror = () => { img.src = "./images/placeholder.jpg" };
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
    const id = card.dataset.id;
    gameslib = gameslib.filter(game => game.id !== id);
    saveToLocalStorage();
    card.remove();
});
container.addEventListener("dblclick", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const id = card.dataset.id;
    const game = gameslib.find(g => g.id === id);

    game.completed = !game.completed;
    card.classList.toggle("completed");
    saveToLocalStorage();
});

function saveToLocalStorage() {
    localStorage.setItem("gameslib", JSON.stringify(gameslib));
}

function loadFromStorage() {
    gameslib = [];
    container.innerHTML = "";
    const stored = localStorage.getItem("gameslib");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    parsed.forEach(game => {
        const g = new Game(game.name, game.url, game.completed);
        g.id = game.id;
        gameslib.push(g);
        adddiv(g);
    });
}

loadFromStorage();

function addGame(name, url, completed = false) {
    const newgame = new Game(name, url, completed);
    gameslib.push(newgame);
    saveToLocalStorage();
    adddiv(newgame);
}

if (gameslib.length === 0) {
    addGame("Cyberpunk 2077", "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg", false);
    addGame("Assassins Creed Valhalla", "https://upload.wikimedia.org/wikipedia/en/f/ff/Assassin%27s_Creed_Valhalla_cover.jpg", true);
}