const createEditForm = (cat) => `
<form id="create-edit-form" action="">
<div class="form-wrapper">
    <div>
    <label for="name" required>
        Кличка*
    </label>
    <input
            ${cat?.name ? `value="${cat.name}"` : `placeholder="Имя"`}
            name="name" maxlength="40"
            required
        />
    </div>
    <div>
    <label for="image">
        Изображение
    </label>
    <input size="40" 
            name="image"
            ${
                cat?.image
                    ? `value="${cat.image}"`
                    : `placeholder="Ссылка на изображение"`
            }
        />
    </div>
    <div>
    <label for="age">
        Возраст
    </label>
    <input
            name="age"
            type="number"
            max="30"
            ${cat?.age ? `value="${cat.age}"` : `placeholder="Возраст"`}
        />
    </div>
    <div>
    <label for="rate">
        Рейтинг
    </label>
    <input
            name="rate"
            type="number"
            max="5"
            ${cat?.rate ? `value="${cat.rate}"` : `placeholder="Рейтинг"`}
        />
    </div>
    <div>
    <label for="decsription">
        Описание
    </label>
    <textarea
            name="description"
            rows="3"
            size="30"
        >${cat?.description ?? ""}</textarea>
    </div>
    <div class="form-buttons"> 
    <button type="submit">Отправить</button>
    <button type="button" id="close-form">Закрыть</button>
    </div>
</div>
</form>
`;
export default createEditForm;
