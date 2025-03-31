import axios from 'axios';
import parseRss from './rssParser.js';

/* eslint-disable */
const validate = (schema, field, state) => {
  if (field === "alreadySuccess") {
    state.message = field;
  } else {
    try {
      schema.validateSync(field, { abortEarly: false });
      axios
        .get(
          `https://allorigins.hexlet.app/get?url=${encodeURIComponent(`${field.url}`)}`
        )
        .then((response) => {
          const newDiv = document.createElement("div");
          newDiv.innerHTML = response;
          newDiv.innerHTML = response.data.contents;
          state.rssList = parseRss(response);
          state.message =  "downloaded";
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      const errors = e.errors;
      const key = errors[0].key;
      return key;
    }
    /* eslint-enable */
  }
};

export default validate;
