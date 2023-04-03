const defaultImage =
    "https://raw.githubusercontent.com/leo-shirokov/cats/main/imageDefault.jpeg";

const createEditForm = (cat) => `
<form id="create-edit-form" action="">
<div class="form-wrapper">
    <div>
    <label for="name" required>
        Позывной*
    </label>
    <input class="formField"
            ${cat?.name ? `value="${cat.name}"` : `placeholder="Имя"`}
            name="name" maxlength="40"
            required
        />
    </div>
    <div>
    <label for="image">
        Фото
    </label>
    <input size="40" 
            name="image"
            value="${cat?.image ? cat.image : defaultImage}"
        />
    </div>
    <div>
    <label for="age">
        Возраст
    </label>
    <input
            class="formField"
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
            class="formField"
            name="rate"
            type="number"
            min="0"
            max="5"
            ${cat?.rate ? `value="${cat.rate}"` : `placeholder="0"`}
        />
    </div>
    <div>
   
    <textarea
            class="formField"
            name="description"
            rows="3"
            cols="46"
            placeholder="Описание" 
        >${cat?.description ?? ""}</textarea>
    </div>
    <div class="form-buttons"> 
    <button type="submit">Сохранить</button>
    <button class="uk-modal-close-default" type="button" uk-close id="close-form"></button>
    </div>
</div>
</form>
`;
export default createEditForm;
