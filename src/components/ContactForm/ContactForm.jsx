import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

const ContactForm = ({ addContact, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;

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

  const handleSubmitNewContact = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.find(contact => contact.name === newContact.name)) {
      reset();
      return alert(`${newContact.name} is already in contacts`);
    }
    addContact(newContact);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={s.bos}>
      <form action="" onSubmit={handleSubmitNewContact}>
        <label className={s.text}>
          Name
          <input
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleInputChange}
          />
        </label>
        <label className={s.text}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleInputChange}
          />
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};
ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactForm;
