import { Formik } from 'formik';
import React from 'react';
import { loginSchema } from 'schemas/formik';
import {
  FormikButton,
  FormikStyledErrorMessage,
  FormikStyledField,
  FormikStyledForm,
  FormLink,
} from '../../StyledComponents/Formik.styled';
import {
  Container,
  Message,
  Title,
} from 'components/StyledComponents/CommonElemens.styled';
import Notification from 'components/Notification/Notification';
import { useNavigate } from 'react-router-dom';
import { logInThunk } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (values, actions) => {
    try {
      await dispatch(logInThunk(values)).unwrap();
      toast.success('You have successfully logged in!');
    } catch (error) {
      toast.error('Wrong login or password! Try again!');
    }
    
    actions.resetForm();
  };

  return (
    <Container>
      <Title>Login</Title>
      <Notification message="Log in to use the App" />

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting, isValid }) => (
          <FormikStyledForm>
            <label>Email address</label>
            <FormikStyledField
              type="email"
              name="email"
              placeholder="Enter your email"
              title="The email address must contain the @ symbol and text after it. For example: email@mail.com"
              className={errors.email && touched.email ? 'input-error' : ''}
            />
            <FormikStyledErrorMessage component="p" name="email" />

            <label>Password</label>
            <FormikStyledField
              type="password"
              name="password"
              placeholder="Enter password"
              title="The password must be at least 5 characters, contain  1 uppercase letter, 1 lowercase letter, 1 number"
              className={
                errors.password && touched.password ? 'input-error' : ''
              }
            />
            <FormikStyledErrorMessage component="p" name="password" />

            <FormikButton type="submit" disabled={!isValid || isSubmitting}>
              Continue
            </FormikButton>
          </FormikStyledForm>
        )}
      </Formik>
      <div>
        <Message>Don't have an account?</Message>
        <FormLink onClick={() => navigate('/register', { replace: true })}>
          👉 Sign up
        </FormLink>
      </div>
    </Container>
  );
};

export default Login;

// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';

// const Basic = () => (
//   <div>
//     <h1>Any place in your app!</h1>
//     <Formik
//       initialValues={{ email: '', password: '' }}
//       validate={values => {
//         const errors = {};
//         if (!values.email) {
//           errors.email = 'Required';
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = 'Invalid email address';
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <Field type="email" name="email" />
//           <ErrorMessage name="email" component="div" />
//           <Field type="password" name="password" />
//           <ErrorMessage name="password" component="div" />
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );

// export default Basic;
