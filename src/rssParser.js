const parseRss = (rss) => {
  const content = rss.data.contents;
  const parsedRss = new DOMParser(content);
  const dom = parsedRss.parseFromString(content, 'text/xml');
  const finiallyDom = {};
  finiallyDom.title = dom.querySelector('title').textContent;
  finiallyDom.description = dom.querySelector('description').textContent;
  const items = [...dom.querySelectorAll('item')];
  finiallyDom.items = items.map((item) => ({
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
  }));
  return finiallyDom;
};
export default parseRss;
