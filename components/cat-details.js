import { getCatByID, baseUrl } from "../api.js";

async function showCatDetails(id) {
    const cat = await getCatByID(id);
    const holder = document.getElementById("cat-details");
    holder.innerHTML = "";
    const closeBut = document.createElement("button");
    closeBut.className = "details-close";
    closeBut.addEventListener("click", () => {
        holder.classList.remove("active");
        overlay.classList.remove("active");
    });
    closeBut.innerHTML = "&times;";
    holder.appendChild(closeBut);
    if (cat?.image) {
        const img = document.createElement("img");
        img.className = "details-image";
        img.src = cat.image;
        holder.appendChild(img);
    }
    const detailsContainer = document.createElement("div");
    detailsContainer.className = "details-wrapper";
    holder.append(detailsContainer);

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
    for (let i = 0; i < cat?.rate; i += 1) {
        const pRate = document.createElement("i");
        pRate.className = "fa-star rate-star";
        pRate.classList.add(cat.rate ? "fa-solid" : "fa-regular");
        rateContainer.appendChild(pRate);
        detailsContainer.appendChild(rateContainer);
    }

    const pDesc = document.createElement("p");
    pDesc.innerText = cat?.description ?? "";
    detailsContainer.appendChild(pDesc);

    holder.classList.add("active");

    const like = document.createElement("i");
    like.className = "fa-heart details-like";
    like.classList.add(cat.favorite ? "fa-solid" : "fa-regular");
    detailsContainer.append(like);
    like.addEventListener("click", (e) => {
        e.stopPropagation();
        if (cat.id) {
            fetch(`${baseUrl}update/${cat.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ favorite: !cat.favorite }),
            }).then((res) => {
                if (res.status === 200) {
                    like.classList.toggle("fa-solid");
                    like.classList.toggle("fa-regular");
                }
            });
        }
    });
}
export default showCatDetails;
