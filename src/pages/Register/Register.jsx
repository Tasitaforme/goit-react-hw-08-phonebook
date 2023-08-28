import { Formik } from 'formik';
import React from 'react';
import { registerSchema } from 'schemas/formik';
import {
  FormikButton,
  FormikStyledErrorMessage,
  FormikStyledField,
  FormikStyledForm,
  FormLink,
} from '../../components/StyledComponents/Formik.styled';
import {
  Container,
  Message,
  Title,
} from 'components/StyledComponents/CommonElemens.styled';
import Notification from 'components/Notification/Notification';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { signUpThunk } from 'redux/auth/thunks';
import { toast } from 'react-hot-toast';


const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  

  const onSubmit = async (values, actions) => {
    try {
      await dispatch(signUpThunk(values)).unwrap();
      toast.success('You have successfully registered!');
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(`This email already exists,\n enter another email or log in!`);
        return;
      }
      if (error.response.status === 500) {
        toast.error(
          `It seems that the server is overloaded, please try again later...`
        );
        return;
      }
      toast.error(`Unknown error... \n ${error.message}`);
    }

    actions.resetForm();
  };

  
  
  // console.log(isError);

  // const isAuth = useSelector(selectToken);

  // useEffect(() => {
  //   isAuth && navigate('/contacts');
  // }, [isAuth, navigate]);

  // const onSubmit = async ({ name, email, password }, actions) => {
  //   await signUp({ name, email, password }).then(()=>navigate('/contacts'));
  //   console.log(data);
  //   // const data = await signUp({name, email, password});
  //   // console.log(data);

  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   actions.resetForm();
  // };

  // const onSubmit = async (values, actions) => {
  //   await signUp(values).then(() => navigate('/contacts'));

  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   actions.resetForm();
  // };

  return (
    <Container>
      <Title>Create your account</Title>
      <Notification message="Sign up to use the App" />

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerSchema}
        // onSubmit={values => {
        //   console.log('submit', values);
        // }}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting, isValid }) => (
          <FormikStyledForm>
            <label>Name</label>
            <FormikStyledField
              type="text"
              name="name"
              placeholder="Enter your name"
              className={errors.name && touched.name ? 'input-error' : ''}
            />
            <FormikStyledErrorMessage component="p" name="name" />

            <label>Email address</label>
            <FormikStyledField
              type="email"
              name="email"
              placeholder="Enter your email"
              className={errors.email && touched.email ? 'input-error' : ''}
            />
            <FormikStyledErrorMessage component="p" name="email" />

            <label>Password</label>
            <FormikStyledField
              type="password"
              name="password"
              placeholder="Enter password"
              className={
                errors.password && touched.password ? 'input-error' : ''
              }
            />
            <FormikStyledErrorMessage component="p" name="password" />

            <label>Confirmation password</label>
            <FormikStyledField
              type="password"
              name="confirmPassword"
              placeholder="Repeat password"
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? 'input-error'
                  : ''
              }
            />
            <FormikStyledErrorMessage component="p" name="confirmPassword" />

            <FormikButton type="submit" disabled={!isValid || isSubmitting}>
              Continue
            </FormikButton>
          </FormikStyledForm>
        )}
      </Formik>
      <div>
        <Message>Already have an account?</Message>
        <FormLink onClick={() => navigate('/login', { replace: true })}>
          👉 Log in
        </FormLink>
      </div>
    </Container>
  );
};

export default Register;
