const createLi = (element, id) => {
  /* ----------------------------MAKING LI'S--------------------------- */
  const newLi = document.createElement('li');
  newLi.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-start',
    'border-0',
    'border-end-0',
  );
  /* ------------------------------CREATE LINK----------------------------- */
  const a = document.createElement('a');
  a.setAttribute('href', element.link);
  a.setAttribute('data-id', id);
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'nooperner noreferrer');
  a.classList.add('fw-bold');
  a.textContent = element.title;
  newLi.append(a);
  /* --------------------------------CREATE BUTTON----------------------------- */
  const newButton = document.createElement('button');
  newButton.setAttribute('type', 'button');
  newButton.setAttribute('data-id', id);
  newButton.setAttribute('data-bs-toggle', 'modal');
  newButton.setAttribute('data-bs-target', '#modal');
  newButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  newButton.textContent = 'Просмотр';
  /* ---------------------------------FINISH MAKING BUTTON----------------------- */
  newLi.append(newButton);
  return newLi;
};

const createCard = (rss) => {
  const postsContainer = document.querySelector('.posts');
  const feedsContainer = document.querySelector('.feeds');
  /* ---------------------------------------FIRST PART AND MAKING ID----------------------------- */
  let id = 0;
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
  rss.items.forEach((item) => {
    const li = createLi(item, id);
    postsUl.append(li);
    id += 1;
  });
  mainCardPosts.append(postsUl);
  postsContainer.innerHTML = '';
  postsContainer.append(mainCardPosts);
  /* ---------------------------------------SECOND PART--------------------------------- */
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
  /* ----------------------------------MAKE FEEDS LI TITLE------------------------------ */
  const feedsTitle = document.createElement('h3');
  feedsTitle.classList.add('h6', 'm-0');
  feedsTitle.textContent = rss.title;
  /* ----------------------------------MAKE FEEDS LI P-------------------------------- */
  const feedsP = document.createElement('p');
  feedsP.classList.add('m-0', 'small', 'text-black-50');
  feedsP.textContent = rss.description;
  /* ----------------------------------APPEND ELEMENTS IN CONTAINER--------------------------- */
  feedsUlLi.append(feedsTitle, feedsP);
  feedsUl.append(feedsUlLi);
  feedsCardBody.append(h2Feed, feedsUl);
  mainFeedsBody.append(feedsCardBody);
  feedsContainer.innerHTML = '';
  feedsContainer.append(mainFeedsBody);
};
export default createCard;
