import * as yup from 'yup';
import i18next from 'i18next';

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        URLerror: 'Ссылка должна быть валидным URL',
        alreadySuccess: 'RSS уже существует',
        downloaded: 'RSS успешно загружен',
      },
    },
  },
});

const schema = yup.object().shape({
  url: yup.string().url().nullable(),
});

/* eslint-disable */
const validate = (field) => {
  if (field === 'alreadyUsed') {
    return [i18next.t('alreadySuccess')];
  } else {
    try {
      schema.validateSync(field, { abortEarly: false });
      return [i18next.t('downloaded')];
    } catch (e) {
      switch (e.errors[0]) {
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
