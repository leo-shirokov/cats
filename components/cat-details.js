import { getCatByID, baseUrl } from "../api.js";

async function showCatDetails(id) {
    const cat = await getCatByID(id);
    const holder = document.getElementById("cat-details");
    holder.innerHTML = "";
    const modale = document.querySelector("#modal-center");
    const closeBut = document.createElement("button");
    closeBut.className = "details-close";
    closeBut.innerHTML = "&times;";
    closeBut.addEventListener("click", () => {
        UIkit.modal(modale).hide();
    });
    holder.appendChild(closeBut);

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "details-wrapper";
    holder.append(detailsContainer);

    if (cat?.image) {
        const img = document.createElement("img");
        img.className = "details-image";
        img.src = cat.image;
        detailsContainer.appendChild(img);
    }
    // else {
    //     const defaultImage =
    //         "https://raw.githubusercontent.com/leo-shirokov/cats/main/imageDefault.jpeg";
    //     const img = document.createElement("img");
    //     img.className = "details-image";
    //     img.src = defaultImage;
    //     detailsContainer.appendChild(img);
    // }

    const h3 = document.createElement("h3");
    h3.className = "details-header";
    h3.innerText = cat?.name ?? "No name";
    detailsContainer.appendChild(h3);
    const pAge = document.createElement("p");
    pAge.className = "details-age";
    pAge.innerText = "Возраст: " + cat?.age ?? "0";
    detailsContainer.appendChild(pAge);
    //рейтинг
    const rateContainer = document.createElement("div");
    rateContainer.className = "details-rate";
    for (let i = 0; i < 5; i += 1) {
        const pRate = document.createElement("i");
        pRate.className = "fa-star rate-star";
        pRate.classList.add(i < cat.rate ? "fa-solid" : "fa-regular");
        rateContainer.appendChild(pRate);
        detailsContainer.appendChild(rateContainer);
    }

    const pDesc = document.createElement("p");
    pDesc.className = "details-description";
    pDesc.innerText = cat?.description ?? "";
    detailsContainer.appendChild(pDesc);
}
export default showCatDetails;
