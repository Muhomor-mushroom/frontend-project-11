import _ from 'lodash';

const editContent = (element, text) => {
  /* eslint-disable */
  element.textContent = text;
  /* eslint-enable */
};

const view = (elements) => (path, value) => {
  switch (path) {
    case 'activeUrl':
      break;
    case 'message':
      elements.input.classList.remove('is-invalid');
      elements.p.classList.remove('text-danger');
      editContent(elements.p, '');
      if (!_.isEmpty(value)) {
        console.log(value);
        switch (value[0]) {
          case 'RSS успешно загружен':
            elements.form.reset();
            elements.p.classList.add('text-success');
            editContent(elements.p, value);
            break;
          case 'RSS уже существует':
            elements.input.classList.add('is-invalid');
            elements.p.classList.add('text-danger');
            editContent(elements.p, value);
            break;
          case 'Ссылка должна быть валидным URL':
            elements.input.classList.add('is-invalid');
            elements.p.classList.add('text-danger');
            editContent(elements.p, value);
            break;
          default:
            break;
        }
      } else {
        elements.form.reset();
        editContent(elements.p, '');
      }
      break;
    case 'previousUrl':
      break;
    default:
      console.log("That's all!");
      break;
  }
};
export default view;
