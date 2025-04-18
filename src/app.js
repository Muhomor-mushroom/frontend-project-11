import i18next from 'i18next';
import axios from 'axios';
/* import { remove } from 'lodash'; */
import validate from './validate.js';
import watch from './view.js';
import ru from './resources/ru.js';
import parseRss from './rssParser.js';

const checkPostsAndFeeds = (state) => {
  state.urlsList.forEach((url) => {
    axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(`${url}`)}`)
      .then((response) => {
        const parsedUrl = parseRss(response);
        const oldPosts = state.posts;
        const newPosts = parsedUrl.posts;
        const oldTitles = oldPosts.map((oldPost) => oldPost.title);
        newPosts.forEach((newPost) => {
          if (!oldTitles.includes(newPost.title)) {
            console.log(`url: ${url}, title: ${newPost.title}`);
            state.posts.unshift({ ...newPost, id: state.posts.length + 1 });
          }
        });
        /* const finalCheck = newPosts.filter((newPost) => {
          return oldPosts.some((oldPost) => !oldPost.title === newPost.title);
        }) */
        setTimeout(() => {
          checkPostsAndFeeds(state);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

/* const startChecking = (state) => {
  let timerChecker = setTimeout(() => {
    checkPostsAndFeeds(state);
    timerChecker = setTimeout(timerChecker, 5000);
  }, 5000);
};
 */
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
    reededPosts: [],
    activePost: {},
    timerIsActive: false,
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
      let timer;
      /* ------------------------------MAKE WATCHED STATE------------------------- */
      const watchedState = watch(elements, i18n, initialState);
      /* ----------------------------EVENT LISTENERS------------------------- */
      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearTimeout(timer);
        validate({ url: elements.input.value }, watchedState.urlsList)
          .then((result) => {
            axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(`${result.url}`)}`)
              .then((response) => {
                const resuletObj = parseRss(response);
                watchedState.urlsList.push(result.url);
                watchedState.feeds = [...watchedState.feeds, ...resuletObj.feeds];
                watchedState.posts = [...watchedState.posts, ...resuletObj.posts];
                checkPostsAndFeeds(watchedState);
                watchedState.message = 'downloaded';
              })
              .catch((error) => {
                console.error(error);
                console.log(error.message);
                /* eslint-disable */
                error.message === 'notRss' ? watchedState.message = error.message : watchedState.message = 'axiosError';
                /* eslint-enable */
              });
          })
          .catch((error) => {
            console.log(error.errors[0]);
            if (error.errors[0].includes('url must not be')) {
              watchedState.message = 'alreadySuccess';
            }
            switch (error.errors[0]) {
              case 'url must be a valid URL':
                watchedState.message = 'URLerror';
                break;
              case 'url is a required field':
                watchedState.message = 'requiredField';
                break;
              default:
                break;
            }
          });
      });
    });
};

export default app;
