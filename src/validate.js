import * as yup from 'yup';

const validate = (url, urlsList) => {
  /* --------------------------------- */
  const schema = yup.object().shape({
    url: yup.string().required().url().nullable()
      .notOneOf(urlsList),
  });
  return schema.validate(url);
};
export default validate;
