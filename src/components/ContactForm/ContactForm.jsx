import React from 'react';
import { nanoid } from 'nanoid';
import { Form, Input, Button } from './ContactForm.styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/contactsSlice';
import { getContacts } from '../../redux/selectors';

const inputNameId = nanoid();
const inputNumberId = nanoid();

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  // const { contacts } = useSelector(getContacts);
  const contacts = Object.values(useSelector(getContacts));

  const checkIfNameIsUnique = name => {
    return contacts.every(contact => {
      if (contact.name === name) {
        alert(`${contact.name} is already in contacts`);
        return false;
      }
      return true;
    });
  };

  const handleNameChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkIfNameIsUnique(e.currentTarget.elements.name.value)) {
      dispatch(
        addTask(e.target.elements.name.value, e.target.elements.number.value)
      );
    }
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor={inputNameId}>
        <span>Name</span>
      </label>
      <Input
        id={inputNameId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleNameChange}
      />

      <label htmlFor={inputNumberId}>
        <span>Number</span>
      </label>
      <Input
        id={inputNumberId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleNameChange}
      />
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactForm;
