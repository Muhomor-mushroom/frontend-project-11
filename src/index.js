import './styles.scss';
import 'bootstrap';
import onChange from 'on-change';
import validate from './yup.js';
import view from './view.js';

/* ----------------------------SELECTORS--------------------------- */
const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('#url-input'),
  confirmButton: document.querySelector('button[type="submit"]'),
};
/* ----------------------------INITIAL STATE-------------------------- */
const initialState = {
  validationComplete: false,
  errors: '',
};
const watchedState = onChange(initialState, (path, value) => {
  switch (path) {
    case 'activeUrl':
      watchedState.errors = validate({ url: value });
      view(elements, watchedState);
      break;
    case 'errors':
      view(elements, watchedState);
      break;
    case 'previousUrl':
      break;
    default:
      console.log('That\'s all!');
      break;
  }
});
/* ----------------------------EVENT LISTENERS------------------------- */
elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  watchedState.previousUrl = watchedState.activeUrl;
  watchedState.activeUrl = elements.input.value;
  if (watchedState.activeUrl === watchedState.previousUrl) {
    watchedState.errors = { 0: 'Successfully Used!' };
  }
  elements.form.reset();
});
