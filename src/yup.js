import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().url().nullable(),
});

/* eslint-disable */
const validate = (field, i18n) => {
  if (field === 'alreadyUsed') {
    return [i18n.t('alreadySuccess')];
  } else {
    try {
      schema.validateSync(field, { abortEarly: false });
      return [i18n.t('downloaded')];
    } catch (e) {
      switch (e.errors[0]) {
        case 'url must be a valid URL':
          return [i18n.t('URLerror')];
        default:
          break;
      }
      /* eslint-enable */
    }
  }
};

export default validate;
