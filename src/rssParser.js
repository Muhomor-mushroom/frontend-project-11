const parseRss = (rss, state) => {
  const content = rss.data.contents;
  const parsedRss = new DOMParser(content);
  const dom = parsedRss.parseFromString(content, "text/xml");
  if (dom.querySelector("parsererror")) {
    state.message = "notRss";
  } else {
    state.message = "downloaded";
  }
  state.feeds.push({
    title: dom.querySelector("title").textContent,
    description: dom.querySelector("description").textContent,
  });
  const items = [...dom.querySelectorAll("item")];
  items.map((item) => {
    state.posts.push({
      title: item.querySelector("title").textContent,
      description: item.querySelector("description").textContent,
      link: item.querySelector("link").textContent,
    });
  });
};
export default parseRss;
