import React from 'react';
import PropTypes from 'prop-types';
import {
  Contacts,
  ContactItem,
  ContactText,
  DeleteBtn,
} from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../redux/contactsSlice';
import { getContacts, getFilter } from '../../redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(getContacts);
  console.log(contacts);
  const stateFilter = useSelector(getFilter);

  const getFilterChange = () => {
    const normalizedFilter = stateFilter.filters.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filterNames = getFilterChange();

  return (
    <Contacts>
      {filterNames.map(({ id, name, number }) => (
        <ContactItem key={id}>
          <ContactText>
            {name}: {number}
          </ContactText>
          <div>
            <DeleteBtn type="button" onClick={() => dispatch(deleteTask(id))}>
              Delete
            </DeleteBtn>
          </div>
        </ContactItem>
      ))}
    </Contacts>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
