/* eslint-disable import/prefer-default-export */
import yup from './yup';

const userRegisterSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(127)
    .trim()
    .required(),
  birthday: yup.date().required(),
  gender: yup
    .number()
    .required(),
  province: yup.object().required(),
  district: yup.object().required(),
  location: yup.string().max(255),
});

export { userRegisterSchema };
