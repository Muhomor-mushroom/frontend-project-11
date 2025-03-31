import _ from 'lodash';
import onChange from 'on-change';

const editContent = (element, text) => {
  /* eslint-disable */
  element.textContent = text;
  /* eslint-enable */
};

const clearForm = (elements) => {
  elements.input.classList.remove('is-invalid');
  elements.p.classList.remove('text-danger');
  editContent(elements.p, '');
};

const makeInputRed = (elements) => {
  elements.input.classList.add('is-invalid');
  elements.p.classList.add('text-danger');
};

const makeInputGreen = (elements) => {
  elements.form.reset();
  elements.p.classList.add('text-success');
};

const watch = (elements, i18n, state) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'activeUrl':
        break;
      case 'message':
        clearForm(elements);
        if (!_.isEmpty(value)) {
          switch (value) {
            case 'downloaded':
              makeInputGreen(elements);
              editContent(elements.p, i18n.t('downloaded'));
              break;
            case 'alreadySuccess':
              makeInputRed(elements);
              editContent(elements.p, i18n.t('alreadySuccess'));
              break;
            case 'URLerror':
              makeInputRed(elements);
              editContent(elements.p, i18n.t('URLerror'));
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
  });
  return watchedState;
};
export default watch;
