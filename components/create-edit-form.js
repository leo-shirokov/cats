const createEditForm = (cat) => `
<div class="form-wrapper">
<form id="create-edit-form" action="">
    <div>
    <label for="name" required>
        Позывной*
    </label>
    <input class="formField"
            ${cat?.name ? `value="${cat.name}"` : `placeholder="Кличка"`}
            name="name" maxlength="40" size="34"
            required
        />
    </div>
    <div>
    <label for="image">
        Фото
    </label>
    <input class="formField" size="40" 
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
            class="formField"
            name="age"
            type="number"
            pattern="[0-9]*"
            inputmode="numeric" 
            min="0"
            max="30"
            ${cat?.age ? `value="${cat.age}"` : `placeholder="0"`}
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
            inputmode="decimal"
            pattern="\d*" 
            min="0"
            max="5"
            ${cat?.rate ? `value="${cat.rate}"` : `placeholder="0"`}
        />
    </div>
    <div>
   
    <textarea
            class="formField"
            name="description"
            rows="4"
            cols="37"
            placeholder="Описание" 
        >${cat?.description ?? ""}</textarea>
    </div>
    <button class="uk-button uk-button-default uk-button-small" type="submit">Сохранить</button>
    <button class="uk-modal-close-default" type="button" uk-close id="close-form"></button>
</form>
</div>
`;
export default createEditForm;
