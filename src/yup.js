import * as yup from 'yup';
import i18next from 'i18next';

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        URLerror: 'Ссылка должна быть валидным URL',
      },
    },
  },
});

const schema = yup.object().shape({
  url: yup.string().url().nullable(),
});

/* eslint-disable */
const validate = (field) => {
  try {
    schema.validateSync(field, { abortEarly: false });
    return {};
  } catch (e) {
    switch (e.errors[0]) {
      case 'url must be a valid URL':
        return [i18next.t('URLerror')];
      default:
        break;
    }
    /* eslint-enable */
  }
};
/* eslint-disable */

export default validate;
