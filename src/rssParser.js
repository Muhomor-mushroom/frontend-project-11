const parseRss = (rss) => {
  const content = rss.data.contents;
  const parsedRss = new DOMParser(content);
  const dom = parsedRss.parseFromString(content, 'text/xml');
  /* eslint-disable */
  if (dom.querySelector("parsererror")) {
    throw new Error("notRss");
  } else {
    const resultObj = {
        feeds: [],
        posts: [],
    };
    resultObj.feeds = [...resultObj.feeds, {
        title: dom.querySelector("title").textContent,
        description: dom.querySelector("description").textContent,

    }];
    const items = [...dom.querySelectorAll("item")];
    items.map((item) => {
      resultObj.posts = [
        ...resultObj.posts,
        {
          title: item.querySelector("title").textContent,
          description: item.querySelector("description").textContent,
          link: item.querySelector("link").textContent,
        },
      ];
    });
    return resultObj
  }
  /* eslint-enable */
};
export default parseRss;
