import Notification from 'components/Notification/Notification';
import { Container, SubTitleText, Title, Wrap } from 'components/StyledComponents/CommonElemens.styled';
import { FormLink } from 'components/StyledComponents/Formik.styled';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from 'redux/auth/selectors';
import { logOutThunk } from 'redux/auth/thunks';

const Profile = () => {

const profile = useSelector(selectProfile);
const dispatch = useDispatch();

const handleLogOut = async () => {
  try {
    await dispatch(logOutThunk()).unwrap();
    toast.success('You have successfully logged out!');
  } catch (error) {
    toast.error(`Unknown error... \n ${error.message}`);
  }
};

  return (
    <Container>
      <Title>Profile</Title>

      <Notification message="Your personal info in the App" />
      <Wrap>
        <SubTitleText>🙄 {profile.name}</SubTitleText>
        <SubTitleText>📪 {profile.email}</SubTitleText>
      </Wrap>
      {/* <Button onClick={() => handleLogOut()}>Logout</Button> */}

      <FormLink onClick={() => handleLogOut()}>👉 Log out</FormLink>
    </Container>
  );
}

export default Profile