import * as yup from "yup";

/* eslint-disable */
const validate = (url, urlsList) => {
  const schema = yup.object().shape({
    url: yup.string().url().nullable().notOneOf(urlsList),
  });
  return schema.validate(url);
};
export default validate;
