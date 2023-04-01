export const baseUrl = "https://cats.petiteweb.dev/api/single/leo-shirokov/";

export const printError = async (res) => {
    if (!res.ok) throw new Error("Ошибка");
    return res.json();
};

export const getAllCats = async () => {
    const res = await fetch(`${baseUrl}show`);
    return printError(res);
};

export const addCat = async (cat) => {
    const res = await fetch(`${baseUrl}add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cat),
    });
    return printError(res);
};

export const updateCat = async (newCat) => {
    const res = await fetch(`${baseUrl}update/${newCat.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCat),
    });
    return printError(res);
};

export const getAllCatsID = async () => {
    const res = await fetch(`${baseUrl}ids`);
    return printError(res);
};

export const getCatByID = async (catId) => {
    const res = await fetch(`${baseUrl}show/${catId}`);
    return printError(res);
};

export const deleteCat = async (id) => {
    const res = await fetch(`${baseUrl}delete/${id}`, {
        method: "DELETE",
    });
    return printError(res);
};

export default {
    getAllCats,
    addCat,
    updateCat,
    getAllCatsID,
    getCatByID,
    deleteCat,
};
