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
    <span class="card-like"></span>
    </div>
    </div>`;
};
export default generateCard;
