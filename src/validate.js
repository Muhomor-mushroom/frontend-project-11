/* eslint-disable */
const validate = (schema, field) => {
  if (field === 'alreadySuccess') {
    return field;
  } else {
    try {
      schema.validateSync(field, { abortEarly: false });
      return 'downloaded';
    } catch (e) {
      switch (e.errors[0]) {
        case 'url must be a valid URL':
          return 'URLerror';
        default:
          break;
      }
      /* eslint-enable */
    }
  }
};

export default validate;
