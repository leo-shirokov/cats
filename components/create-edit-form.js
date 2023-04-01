const createEditForm = (cat) => `
<form id="create-edit-form" action="">
    <label for="name" required>
        <input
            ${cat?.name ? `value="${cat.name}"` : `placeholder="Имя"`}
            name="name"
            required
        />
        Имя
    </label>
    <label for="image">
        <input
            name="image"
            ${
                cat?.image
                    ? `value="${cat.image}"`
                    : `placeholder="Ссылка на изображение"`
            }
        />
        Изображение
    </label>
    <label for="age">
        <input
            name="age"
            type="number"
            ${cat?.age ? `value="${cat.age}"` : `placeholder="Возраст"`}
        />
        Возраст
    </label>
    <label for="rate">
        <input
            name="rate"
            type="number"
            ${cat?.rate ? `value="${cat.rate}"` : `placeholder="Рейтинг"`}
        />
        Рейтинг
    </label>
    <label for="decsription">
        <textarea
            name="description"
            rows="3"
        >${cat?.description ?? ""}</textarea>
        Описание
    </label>
        
    <button type="submit">Отправить</button>
    <button type="button" id="close-form">Закрыть</button>
</form>
`;
export default createEditForm;
