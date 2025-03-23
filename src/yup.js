import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().url().nullable(),
});

const validate = (field) => {
  try {
    schema.validateSync(field, { abortEarly: false });
    return {};
  } catch (e) {
    return e.errors;
  }
};

export default validate;
