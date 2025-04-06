import i18next from 'i18next';
import axios from 'axios';
import validate from './validate.js';
import watch from './view.js';
import ru from './resources/ru.js';
import parseRss from './rssParser.js';

const app = () => {
  /* ----------------------------SELECTORS--------------------------- */
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    confirmButton: document.querySelector('button[type="submit"]'),
    p: document.querySelector('p.feedback'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),
  };
  /* ----------------------------INITIAL STATE-------------------------- */
  const initialState = {
    validationComplete: false,
    message: '',
    posts: [],
    feeds: [],
    urlsList: [],
  };
  /* -------------------------------MAKE SET LOCALE---------------------------- */
  /*    yup.setLocale({
    string: {
      url: () => ({ key: "URLerror" }),
      notOneOf: () => ({ key: "URLsListError"}),
    },
  }); */
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
      /* ----------------------------EVENT LISTENERS------------------------- */
      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        validate({ url: elements.input.value }, watchedState.urlsList)
          .then((result) => {
            watchedState.urlsList.push(result.url);
            axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(`${result.url}`)}`)
              .then((response) => {
                const resuletObj = parseRss(response, watchedState);
                watchedState.feeds = [...watchedState.feeds, ...resuletObj.feeds];
                watchedState.posts = [watchedState.posts, ...resuletObj.posts];
              })
              .catch((error) => {
                console.error(error);
                watchedState.message = error.message;
              });
          })
          .catch((error) => {
            if (error.errors[0].includes('url must not be one')) {
              watchedState.message = 'alreadySuccess';
            } else {
              watchedState.message = 'URLerror';
            }
          });
      });
    });
};

export default app;
