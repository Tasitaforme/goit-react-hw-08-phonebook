import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllContacts, postContact, deleteСontact } from './api/requests';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', () =>
  getAllContacts()
);

export const addContact = createAsyncThunk('contacts/addContact', newContact =>
  postContact(newContact)
);

export const deleteContact = createAsyncThunk('contacts/deleteContact', id =>
  deleteСontact(id)
);