import { ContactForm } from '../../ContactForm/ContactForm';
import Filter from '../../Filter/Filter';
import ContactList from '../../ContactList/ContactList';
import Notification from '../../Notification/Notification';
import {
  Container,
  Title,
  toastOptions,
} from 'components/StyledComponents/CommonElemens.styled';

import { useDispatch, useSelector } from 'react-redux';
import { selectContactsInfo } from 'redux/selectors';

import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operationsThunks';
import { Loader } from '../../Loader/Loader';

const Contacts = () => {
  const { items: contacts, isLoading, error } = useSelector(selectContactsInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isEmptyContactList = contacts?.length < 0;

  return (
    <Container>
      <h1 hidden>Phonebook</h1>
      <Title>Your phonebook</Title>
      <Notification message="👇 Add number to contacts" />
      <ContactForm />

      <Title>Contacts</Title>
      {isEmptyContactList ? (
        <Notification message="🤦‍♂️ Your phonebook is empty" />
      ) : (
        <Filter />
      )}
      {isLoading && !contacts && <Loader />}
      {error && <Notification message={error} />}
      {contacts && <ContactList />}

      <Toaster toastOptions={toastOptions} />
    </Container>
  );
};

export default Contacts;

// import { ContactForm } from '../../ContactForm/ContactForm';
// import Filter from '../../Filter/Filter';
// import ContactList from '../../ContactList/ContactList';
// import Notification from '../../Notification/Notification';
// import { Container, Title, toastOptions } from 'components/StyledComponents/CommonElemens.styled';

// import { useDispatch, useSelector } from 'react-redux';
// import { selectContactsInfo } from 'redux/selectors';

// import { Toaster } from 'react-hot-toast';
// import { useEffect } from 'react';
// import { fetchContacts } from 'redux/operationsThunks';
// import { Loader } from '../../Loader/Loader';

// const Contacts = () => {
//   const { items: contacts, isLoading, error } = useSelector(selectContactsInfo);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   const isEmptyContactList = contacts?.length < 0;

//   return (
//     <Container>
//       <h1>Phonebook</h1>
//       <Notification message="Add number to contacts" />
//       <ContactForm />

//       <Title>Contacts</Title>
//       {isEmptyContactList ? (
//         <Notification message="🤦‍♂️ Your phonebook is empty" />
//       ) : (
//         <Filter />
//       )}
//       {isLoading && !contacts && <Loader />}
//       {error && <Notification message={error} />}
//       {contacts && <ContactList />}

//       <Toaster toastOptions={toastOptions} />
//     </Container>
//   );
// };

// export default Contacts;
