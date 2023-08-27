import { Form, Button, Input } from './ContactForm.styled';

import React, { useState } from 'react';
import { selectContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-hot-toast';
import { addContact } from 'redux/operationsThunks';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isNameExist = contacts.find(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );
    const isNumberExist = contacts.find(
      contact => number.toLowerCase() === contact.number.toLowerCase()
    );

    if (isNameExist) {
      toast.error(`${name} is already in contacts.`, {
        duration: 1500,
      });
      return;
    }
    if (isNumberExist) {
      toast.error(
        `Number ${number} already exists in contacts with the name ${isNumberExist.name}.`
      );
      return;
    }
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="input_name">Name</label>
      <Input
        id="input_name"
        type="text"
        name="name"
        placeholder="Enter contact name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        value={name}
      />

      <label htmlFor="input_tel">Phone number</label>

      <Input
        id="input_tel"
        type="tel"
        name="number"
        placeholder="Enter phone number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and contain more than 5 characters. Can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
        value={number}
      />

      <Button type="submit">Add contact</Button>
    </Form>
  );
};
