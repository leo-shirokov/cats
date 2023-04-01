import { getCatByID, baseUrl } from "../api.js";

async function showCatDetails(id) {
    const cat = await getCatByID(id);
    const holder = document.getElementById("cat-details");
    holder.innerHTML = "";
    const closeBut = document.createElement("button");
    closeBut.className = "details-close";
    closeBut.addEventListener("click", () => {
        holder.classList.remove("active");
    });
    closeBut.innerHTML = "&times;";
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

    const like = document.createElement("i");
    like.className = "fa-heart card-like";
    like.classList.add(cat.favorite ? "fa-solid" : "fa-regular");
    holder.append(like);
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
