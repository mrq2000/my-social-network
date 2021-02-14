/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    notType: 'Sai kiểu rồi bạn ơi, ô này phải kiểu ${type} (^^!)',
    required: 'Vui lòng điền hết hộ mình với <3',
  },
});

export default yup;
