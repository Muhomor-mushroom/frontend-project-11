import i18next from 'i18next';
import * as yup from 'yup';
import validate from './validate.js';
import watch from './view.js';
import ru from './ru.js';

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
    message: '',
  };
  /* -------------------------------MAKE SET LOCALE---------------------------- */
  yup.setLocale({
    url: {
      required: () => ({ key: 'URLerror' }),
    },
  });
  /* --------------------------I18 NEXT-------------------------------*/
  const i18n = i18next.createInstance();
  i18n
    .init({
      lng: 'ru',
      debug: true,
      resources: ru,
    })
    .then(() => {
      /* ------------------------------MAKE WATCHED STATE------------------------- */
      const watchedState = watch(elements, i18n, initialState);
      /* ---------------------------------MAKE SCHEMA----------------------------- */
      const schema = yup.object().shape({
        url: yup.string().url().nullable(),
      });
      /* ----------------------------EVENT LISTENERS------------------------- */
      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        watchedState.previousUrl = watchedState.activeUrl;
        watchedState.activeUrl = elements.input.value;
        if (watchedState.activeUrl === watchedState.previousUrl) {
          watchedState.message = validate(schema, 'alreadySuccess');
        } else {
          watchedState.message = validate(schema, {
            url: elements.input.value,
          });
        }
      });
    });
};

export default app;
