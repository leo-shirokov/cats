import api from "./api.js";
import renderCard from "./components/card.js";
import renderForm from "./components/create-edit-form.js";
import showCatDetails from "./components/cat-details.js";

const addButton = document.getElementById("add-cat-button");
const content = document.getElementById("content");
const formHolder = document.getElementById("create-edit-modal");

async function updateContent() {
    const cats = await api.getAllCats(); // array
    const cardsContent = cats.reduce((prev, cur) => prev + renderCard(cur), ""); // big long text
    content.innerHTML = cardsContent;
}

async function getNewCatId() {
    const catIds = await api.getAllCatsID();
    if (!catIds || catIds?.length === 0) return 1;
    const maxId = Math.max(...catIds);
    return maxId + 1;
}

async function deleteCat(id) {
    await api.deleteCat(id);
    updateContent();
}

// универсальная ф-ция, кот. используется для добавления / изменения карточки
// action: addCat / updateCat
async function update(event, action, catId) {
    event.preventDefault();
    // collect form data
    const formData = new FormData(event.target);
    const newCat = Object.fromEntries(formData.entries());
    newCat.id = catId ?? (await getNewCatId());
    // close modal window
    formHolder.classList.remove("active");
    // api call
    await api[action](newCat);
    // update cats
    await updateContent();
}

function closeFormButton(form) {
    form.querySelector("#close-form").addEventListener("click", () => {
        formHolder.classList.remove("active");
    });
}

function addNewCat() {
    formHolder.innerHTML = renderForm();
    formHolder.classList.add("active");
    // add submit listener to the form
    const form = formHolder.querySelector("form");
    closeFormButton(form);
    form.addEventListener("submit", async (event) => {
        await update(event, "addCat");
    });
}

async function updateCat(id) {
    const currCat = await api.getCatByID(id);
    formHolder.innerHTML = renderForm(currCat);
    formHolder.classList.add("active");
    const form = formHolder.querySelector("form");
    closeFormButton(form);
    form.addEventListener("submit", async (event) => {
        await update(event, "updateCat", currCat.id);
    });
}

async function addLike(event) {
    const [heartId] = event.target?.id?.match(/\d+/);
    const currCat = await api.getCatByID(heartId);
    if ("favorite" in currCat) {
        currCat.favorite = !currCat.favorite;
    } else {
        currCat.favorite = true;
    }
    await api.updateCat(currCat);
    updateContent();
}

function contentEventListeners(event) {
    const [className] = event.target.className.split(" ");
    switch (className) {
        case "cat-card-delete":
            if (confirm("Ты хорошо подумал, кожаный?")) {
                return deleteCat(event.target.value);
            }
            return;
        case "cat-card-update":
            return updateCat(event.target.value);
        case "cat-card-view":
            return showCatDetails(event.target.value);
        case "details-like":
            return addLike(event);
        default:
    }
}

async function main() {
    try {
        await updateContent();
        addButton.addEventListener("click", addNewCat);
        content.addEventListener("click", contentEventListeners);
    } catch (error) {
        console.error(error);
    }
}
main();
