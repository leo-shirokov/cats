import api from "./api.js";
import renderCard from "./components/card.js";
import renderForm from "./components/create-edit-form.js";
import showCatDetails from "./components/cat-details.js";

const addButton = document.getElementById("add-cat-button");
const content = document.getElementById("content");
const formHolder = document.getElementById("create-edit-modal");
const modale = document.getElementById("modal-center-create-edit");

async function updateContent() {
    const cats = await api.getAllCats(); // array
    const cardsContent = cats.reduce((prev, cur) => prev + renderCard(cur), ""); // big long text
    content.innerHTML = cardsContent;
    document.getElementById("badge").innerHTML = cats.length;
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

function addToLocalStorage(form) {
    const formFields = form.querySelectorAll(".formField");

    for (let i = 0; i < formFields.length; i++) {
        formFields[i].addEventListener("change", () => {
            localStorage.setItem(formFields[i].name, formFields[i].value);
        });
    }
}

function readFromLocalStorage(form) {
    const formFields = form.querySelectorAll(".formField");
    formFields.forEach((input) => {
        if (input.tagName === "INPUT") {
            input.value = localStorage.getItem(input.name);
        } else {
            input.innerText = localStorage.getItem(input.name);
        }
    });
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
    UIkit.modal(modale).hide();
    // api call
    await api[action](newCat);
    // update cats
    await updateContent();
}

function closeFormButton(form) {
    form.querySelector("#close-form").addEventListener("click", () => {
        UIkit.modal(modale).hide();
    });
}

function addNewCat() {
    formHolder.innerHTML = renderForm();
    // add submit listener to the form
    const form = formHolder.querySelector("form");
    closeFormButton(form);
    readFromLocalStorage(form);
    addToLocalStorage(form);
    form.addEventListener("submit", async (event) => {
        localStorage.clear();
        await update(event, "addCat");
    });
}

async function updateCat(id) {
    const currCat = await api.getCatByID(id);
    formHolder.innerHTML = renderForm(currCat);
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
            UIkit.modal.confirm("Ты хорошо подумал, кожаный?").then(
                function () {
                    return deleteCat(event.target.value);
                },
                function () {
                    return;
                }
            );
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
