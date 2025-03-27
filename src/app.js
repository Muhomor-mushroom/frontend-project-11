import onChange from 'on-change';
import validate from './yup.js';
import view from './view.js';

const app = () => {
  /* ----------------------------SELECTORS--------------------------- */
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    confirmButton: document.querySelector('button[type="submit"]'),
    p: document.querySelector('p.feedback'),
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
    if (watchedState.activeUrl === watchedState.previousUrl) {
      watchedState.errors = ['RSS уже существует'];
    } else {
      watchedState.errors = validate({ url: elements.input.value });
      console.log(watchedState.errors);
    }
  });
};

export default app;
