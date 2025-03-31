/* eslint-disable */
const validate = (schema, field) => {
  if (field === "alreadySuccess") {
    return field;
  } else {
    try {
      schema.validateSync(field, { abortEarly: false });
      return "downloaded";
    } catch (e) {
      const errors = e.errors;
      const key = errors[0].key;
      return key;
    }
    /* eslint-enable */
  }
};

export default validate;
