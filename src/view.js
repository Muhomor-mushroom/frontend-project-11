import _ from 'lodash';

const view = (elements) => (path, value) => {
  switch (path) {
    case 'activeUrl':
      break;
    case 'errors':
      elements.input.classList.remove('is-invalid');
      if (!_.isEmpty(value)) {
        elements.input.classList.add('is-invalid');
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
