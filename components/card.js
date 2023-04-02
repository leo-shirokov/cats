const generateCard = (cat) => {
    return `<div class="cat-card"><div class="image-container">
    ${
        cat?.image &&
        `<img src=${cat.image} alt="Не удалось загрузить изображение" /></div>`
    } 
    ${cat?.name ?? ""}
        <div class="cat-card-btns">
            <button class="cat-card-view uk-button uk-button-link" href="#modal-center" uk-toggle title="Посмотреть детали" value=${
                cat?.id ?? ""
            }>Детали</button>
            <button class="cat-card-update uk-button uk-button-link" href="#modal-center-create-edit" uk-toggle title="Редактировать" value=${
                cat?.id ?? ""
            }>Изменить</button>
            <button class="cat-card-delete uk-button uk-button-link" title="Удалить" value=${
                cat?.id ?? ""
            }>Удалить</button>
            </div>
            <i class="details-like fa-heart  ${
                cat?.favorite ? "fa-regular" : "fa-solid"
            }" id="${`heart-${cat?.id}`}"></i>
    </div>`;
};
export default generateCard;
