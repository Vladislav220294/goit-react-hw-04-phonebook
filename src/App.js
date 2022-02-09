import { useEffect, useState } from 'react';
import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localStorageSaved = JSON.parse(localStorage.getItem('contacts'));
    return (
      localStorageSaved || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    setContacts(contacts => [...contacts, newContact]);
  };

  const filterContacts = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };
  const removeContact = id =>
    setContacts(contacts => contacts.filter(el => el.id !== id));
  useEffect(() => {
    const localStorageSave = JSON.stringify(contacts);
    localStorage.setItem('contacts', localStorageSave);
  }, [contacts]);
  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterContacts} />
      <ContactList contacts={visibleContacts} removeContact={removeContact} />
    </div>
  );
};

export default App;
