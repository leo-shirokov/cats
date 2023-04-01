const generateCard = (cat) => {
    return `<div class="cat-card">
    ${cat?.image && `<img src=${cat.image} />`} 
    ${cat?.name ?? ""}
        <div class="cat-card-btns">
            <button class="cat-card-view" title="Посмотреть детали" value=${
                cat?.id ?? ""
            }>Детали</button>
            <button class="cat-card-update" title="Редактировать" value=${
                cat?.id ?? ""
            }>&#9998;</button>
            <button class="cat-card-delete" title="Удалить" value=${
                cat?.id ?? ""
            }>&#10008;</button>
            <i class="details-like fa-heart  ${
                cat?.favorite ? "fa-regular" : "fa-solid"
            }" id="${`heart-${cat?.id}`}"></i>
        </div>
    </div>`;
};
export default generateCard;
