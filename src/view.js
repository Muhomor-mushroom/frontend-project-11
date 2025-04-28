import onChange from 'on-change';

const isReededPost = (id, watchedState) => {
  const thisPost = watchedState.posts.find((el) => el.id === id);
  if (watchedState.reededPosts.includes(thisPost)) {
    return true;
  }
  return false;
};

const createPostLi = (item, id, watchedState) => {
  /* ----------------------------MAKING LI'S--------------------------- */
  const newLi = document.createElement('li');
  newLi.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-start',
    'border-0',
    'border-end-0',
    'post',
  );

  /* ------------------------------CREATE LINK----------------------------- */
  const a = document.createElement('a');
  a.setAttribute('href', item.link);
  a.setAttribute('data-id', id);
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'nooperner noreferrer');
  if (!isReededPost(id, watchedState)) {
    a.classList.add('fw-bold');
  } else {
    a.classList.add('fw-normal', 'link-secondary');
  }
  a.textContent = item.title;
  a.addEventListener('click', () => {
    console.log(isReededPost(id, watchedState));
    const post = watchedState.posts.find((element) => element.id === id);
    if (!watchedState.reededPosts.includes(post)) {
      /* eslint-disable */
      watchedState.reededPosts.push(post);
      watchedState.activePost = post;
    }
    watchedState.activePost = post;
    /* eslint-enable */
  });
  newLi.append(a);
  /* --------------------------------CREATE BUTTON----------------------------- */
  const newButton = document.createElement('button');
  newButton.setAttribute('type', 'button');
  newButton.setAttribute('data-id', id);
  newButton.setAttribute('data-bs-toggle', 'modal');
  newButton.setAttribute('data-bs-target', '#modal');
  newButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  newButton.textContent = 'Просмотр';
  newButton.addEventListener('click', () => {
    const post = watchedState.posts.find((element) => element.id === id);
    if (!watchedState.reededPosts.includes(post)) {
      /* eslint-disable */
      watchedState.reededPosts.push(post);
    }
    watchedState.activePost = post;
    /* eslint-enable */
  });
  /* ---------------------------------FINISH MAKING BUTTON----------------------- */
  newLi.append(newButton);
  return newLi;
};

const createFeedLi = (item) => {
  const feedsUlLi = document.createElement('li');
  feedsUlLi.classList.add('list-group-item', 'border-0', 'border-end-0');
  /* ----------------------------------MAKE FEEDS LI TITLE------------------------------ */
  const feedsTitle = document.createElement('h3');
  feedsTitle.classList.add('h6', 'm-0');
  feedsTitle.textContent = item.title;
  /* ----------------------------------MAKE FEEDS LI P-------------------------------- */
  const feedsP = document.createElement('p');
  feedsP.classList.add('m-0', 'small', 'text-black-50');
  feedsP.textContent = item.description;
  feedsUlLi.append(feedsTitle, feedsP);
  return feedsUlLi;
};

const renderPosts = (value, watchedState) => {
  const postsContainer = document.querySelector('.posts');
  /* -----------------------------------MAKE POSTS CARD CONTAINER------------------------------- */
  const mainCardPosts = document.createElement('div');
  mainCardPosts.classList.add('card', 'border-0');
  /* ----------------------------------MAKE POSTS BODY-------------------------------- */
  const postsCardBody = document.createElement('div');
  postsCardBody.classList.add('card-body', '__web-inspector-hide-shortcut__');
  /* ----------------------------------MAKE POSTS H2-------------------------------- */
  const h2Post = document.createElement('h2');
  h2Post.classList.add('card-title', 'h4');
  h2Post.textContent = 'Посты';
  /* ----------------------------------POSTS APPEND ELEMENTS----------------------------- */
  postsCardBody.append(h2Post);
  mainCardPosts.append(postsCardBody);
  /* ----------------------------------MAKE RSS POSTS-------------------------------- */
  const postsUl = document.createElement('ul');
  postsUl.classList.add('list-group', 'border-0', 'rounded-0');
  value.forEach((item) => {
    const newLi = createPostLi(item, item.id, watchedState);
    postsUl.append(newLi);
  });
  mainCardPosts.append(postsUl);
  postsContainer.append(mainCardPosts);
};

const renderFeeds = (value) => {
  const feedsContainer = document.querySelector('.feeds');
  /* ----------------------------------MAKE FEEDS CARD-------------------------------- */
  const mainFeedsBody = document.createElement('div');
  mainFeedsBody.classList.add('card', 'border-0');
  /* ----------------------------------MAKE FEEDS BODY-------------------------------- */
  const feedsCardBody = document.createElement('div');
  feedsCardBody.classList.add('card-body');
  /* ----------------------------------MAKE FEEDS TITLE-------------------------------- */
  const h2Feed = document.createElement('h2');
  h2Feed.classList.add('card-title', 'h4');
  h2Feed.textContent = 'Фиды';
  feedsCardBody.append(h2Feed);
  /* ----------------------------------MAKE FEEDS UL-------------------------------- */
  const feedsUl = document.createElement('ul');
  feedsUl.classList.add('list-group', 'border-0', 'rounded-0');
  /* ----------------------------------MAKE FEEDS LI OF UL------------------------------ */
  const feedsUlLi = document.createElement('li');
  feedsUlLi.classList.add('list-group-item', 'border-0', 'border-end-0');
  /* ----------------------------------APPEND ELEMENTS IN CONTAINER--------------------------- */
  value.forEach((item) => {
    const newLi = createFeedLi(item);
    feedsUl.append(newLi);
  });
  feedsCardBody.append(h2Feed, feedsUl);
  mainFeedsBody.append(feedsCardBody);
  feedsContainer.append(mainFeedsBody);
};

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
  clearForm(elements);
};

const renderModal = (post) => {
  const modalButton = document.querySelector('[rel="noopener noreferrer"]');
  const modalTitle = document.querySelector('.modal-title');
  const modalDescription = document.querySelector('.modal-body');
  modalTitle.textContent = post.title;
  modalDescription.textContent = post.description;
  modalButton.removeAttribute('href');
  modalButton.setAttribute('href', post.link);
};

const requestViewer = (status, elements, i18n) => {
  switch (status) {
    case 'pending':
      elements.input.setAttribute('disabled', 'true');
      elements.confirmButton.setAttribute('disabled', 'true');
      break;
    case 'success':
      elements.input.removeAttribute('disabled');
      elements.confirmButton.removeAttribute('disabled');
      makeInputGreen(elements);
      editContent(elements.p, i18n.t('downloaded'));
      break;
    case 'failed':
      elements.input.removeAttribute('disabled');
      elements.confirmButton.removeAttribute('disabled');
      break;
    default:
      break;
  }
};

const makeReaded = (allPosts) => {
  allPosts.forEach((unreadedPost) => {
    const postLink = document.querySelector(`[data-id='${unreadedPost.id}']`);
    postLink.classList.remove('fw-bold');
    postLink.classList.add('fw-normal', 'link-secondary');
  });
};

/* eslint-disable */
const watch = (elements, i18n, state) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case "activeUrl":
        break;
      case "activePost":
        renderModal(value);
        break;
      case "reededPosts":
        makeReaded(value);
        break;
      case "feeds":
        elements.feedsContainer.innerHTML = "";
        renderFeeds(value);
        break;
      case "posts":
        elements.postsContainer.innerHTML = "";
        renderPosts(value, watchedState);
        break;
      case "requestStatus":
        console.log(value);
        requestViewer(value, elements, i18n);
        break;
      case "message":
        clearForm(elements);
        if (value !== "downloaded") {
          makeInputRed(elements);
          editContent(elements.p, i18n.t(value));
        }
        break;
      case "previousUrl":
        break;
      default:
        break;
    }
  });
  return watchedState;
};
/* eslint-enbale */
export default watch;
