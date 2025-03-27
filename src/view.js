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
    case 'errors':
      elements.input.classList.remove('is-invalid');
      elements.p.classList.remove('text-danger');
      editContent(elements.p, '');
      if (!_.isEmpty(value)) {
        console.log(value);
        elements.input.classList.add('is-invalid');
        elements.p.classList.add('text-danger');
        editContent(elements.p, value);
      } else {
        elements.form.reset();
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
