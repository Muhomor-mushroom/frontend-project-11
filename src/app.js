import onChange from 'on-change';
import validate from './yup.js';
import view from './view.js';

const app = () => {
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
  const watchedState = onChange(initialState, view(elements));
  /* ----------------------------EVENT LISTENERS------------------------- */
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.previousUrl = watchedState.activeUrl;
    watchedState.activeUrl = elements.input.value;
    console.log(`ACTIVE: ${watchedState.activeUrl} AND PREVIOUS: ${watchedState.previousUrl}`);
    if (watchedState.activeUrl === watchedState.previousUrl) {
      watchedState.errors = { 0: 'Successfully Used!' };
    } else {
      watchedState.errors = validate({ url: elements.input.value });
    }
  });
};

export default app;
