import i18next from 'i18next';
import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().url().nullable(),
});

/* eslint-disable */
const validate = (field, i18next) => {
  if (field === 'alreadyUsed') {
    return [i18next.t('alreadySuccess')];
  } else {
    try {
      schema.validateSync(field, { abortEarly: false });
      return [i18next.t('downloaded')];
    } catch (e) {
      switch (e.errors[0].key) {
        case 'url must be a valid URL':
          return [i18next.t('URLerror')];
        default:
          break;
      }
      /* eslint-enable */
    }
  }
};
/* eslint-disable */

export default validate;
