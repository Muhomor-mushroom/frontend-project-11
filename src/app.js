import i18next from 'i18next';
import axios from 'axios';
/* import { remove } from 'lodash'; */
import validate from './validate.js';
import watch from './view.js';
import ru from './resources/ru.js';
import parseRss from './rssParser.js';

const checkPostsAndFeeds = (state) => {
  state.urlsList.forEach((url) => {
    axios
      .get(
        `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(`${url}`)}`,
      )
      .then((response) => {
        const parsedUrl = parseRss(response);
        const oldPosts = state.posts;
        const newPosts = parsedUrl.posts;
        const oldTitles = oldPosts.map((oldPost) => oldPost.title);
        newPosts.forEach((newPost) => {
          if (!oldTitles.includes(newPost.title)) {
            state.posts.unshift({ ...newPost, id: state.posts.length + 1 });
          }
        });
      })
      .catch(() => {});
  });
  setTimeout(() => {
    checkPostsAndFeeds(state);
  }, 5000);
};

const urlConvert = (obj) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(`${obj.url}`)}`;

const app = () => {
  /* ----------------------------SELECTORS AND STATUSES--------------------------- */
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    confirmButton: document.querySelector('button[type="submit"]'),
    p: document.querySelector('p.feedback'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),
  };
  const requestStatuses = {
    pending: 'pending',
    success: 'success',
    failed: 'failed',
  };

  const messages = {
    downloaded: 'downloaded',
    notRss: 'notRss',
    alreadySuccess: 'alreadySuccess',
    URLerror: 'URLerror',
    requiredField: 'requiredField',
  };
  /* ----------------------------INITIAL STATE-------------------------- */
  const initialState = {
    validationComplete: false,
    message: '',
    posts: [],
    feeds: [],
    urlsList: [],
    reededPosts: [],
    requestStatus: '',
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
      /* ------------------------------MAKE WATCHED STATE------------------------- */
      const watchedState = watch(elements, i18n, initialState);
      /* ------------------------------MAKE COUNTER FOR PARSER-------------------- */
      /* eslint-disable */
      let parseCounter = 1;
      /* eslint-enable */
      /* ----------------------------EVENT LISTENERS------------------------- */
      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        watchedState.requestStatus = requestStatuses.pending;
        validate({ url: elements.input.value }, watchedState.urlsList)
          .then((result) => {
            axios
              .get(urlConvert(result))
              .then((response) => {
                const resuletObj = parseRss(response, parseCounter);
                watchedState.urlsList.push(result.url);
                watchedState.feeds = [
                  ...watchedState.feeds,
                  ...resuletObj.feeds,
                ];
                watchedState.posts = [
                  ...watchedState.posts,
                  ...resuletObj.posts,
                ];
                watchedState.message = messages.downloaded;
                watchedState.requestStatus = requestStatuses.success;
                /* eslint-disable */
                parseCounter = parseCounter += watchedState.posts.length;
                /* eslint-enable */
              })
              .catch((error) => {
                /* eslint-disable */
                error.message === messages.notRss
                  ? (watchedState.message = error.message)
                  : (watchedState.message = "axiosError");
                watchedState.requestStatus = requestStatuses.failed;
                /* eslint-enable */
              });
          })
          .catch((error) => {
            watchedState.requestStatus = requestStatuses.failed;
            if (error.errors[0].includes('url must not be')) {
              watchedState.message = messages.alreadySuccess;
            }
            switch (error.errors[0]) {
              case 'url must be a valid URL':
                watchedState.message = messages.URLerror;
                break;
              case 'url is a required field':
                watchedState.message = messages.requiredField;
                break;
              default:
                break;
            }
          });
      });
      checkPostsAndFeeds(watchedState);
    });
};

export default app;
