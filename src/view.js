import _ from 'lodash';

const view = (elements, state) => {
  elements.input.classList.remove('is-invalid');
  if (!_.isEmpty(state.errors)) {
    elements.input.classList.add('is-invalid');
  }
};
export default view;
