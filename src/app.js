import onChange from 'on-change';
import validate from './yup.js';
import view from './view.js';
import i18next from 'i18next';
import ru from './ru.js';
import * as yup from 'yup';

const app = () => {
  /* --------------------------I18 NEXT-------------------------------*/
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources: ru,
  })
  .then (() => {
    /* -----------------------------SET LOCALE------------------------- */
     /* yup.setLocale({
      url: {
        default: ({ key: 'URLerror' })
      },
    }); */
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
    message: '',
  };
  const watchedState = onChange(initialState, view(elements));
  /* ----------------------------EVENT LISTENERS------------------------- */
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.previousUrl = watchedState.activeUrl;
    watchedState.activeUrl = elements.input.value;
    if (watchedState.activeUrl === watchedState.previousUrl) {
      watchedState.message = validate('alreadyUsed', i18n);
    } else {
      watchedState.message = validate({ url: elements.input.value }, i18n);
    }
  });
  })
};

export default app;
