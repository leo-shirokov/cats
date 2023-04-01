import { getCatByID } from "../api.js";

async function showCatDetails(id) {
    const cat = await getCatByID(id);
    const holder = document.getElementById("cat-details");
    holder.innerHTML = "";
    const closeBut = document.createElement("button");
    closeBut.addEventListener("click", () => {
        holder.classList.remove("active");
    });
    closeBut.innerHTML = "X";
    holder.appendChild(closeBut);
    if (cat?.image) {
        const img = document.createElement("img");
        img.src = cat.image;
        holder.appendChild(img);
    }
    const h3 = document.createElement("h3");
    h3.innerText = cat?.name ?? "No name";
    holder.appendChild(h3);
    const pAge = document.createElement("p");
    pAge.innerText = cat?.age ?? "0";
    holder.appendChild(pAge);
    const pRate = document.createElement("p");
    pRate.innerText = cat?.rate ?? "";
    holder.appendChild(pRate);
    const pDesc = document.createElement("p");
    pDesc.innerText = cat?.description ?? "";
    holder.appendChild(pDesc);
    holder.classList.add("active");
}
export default showCatDetails;
