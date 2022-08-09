import * as Yup from 'yup';

function RegisterValidation() {
  
  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .min(10)
      .max(63)
      .required('Email is required')
      .test({
        name: 'first',
        exclusive: false,
        message: 'before @ at least 2 characters',
        test: value => value[0]&&value[1]!=='@',
      }),

    password: Yup.string().min(6).max(16).required('Password is required').matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$/,
      'please enter one letter and one number',
    ),

    confirmPassword: Yup.string()
      .min(6)
      .max(16)
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
    name: Yup.string()
      .min(1, 'Must be 1 character or more')
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
  });
  return validate;
}

export default RegisterValidation;
