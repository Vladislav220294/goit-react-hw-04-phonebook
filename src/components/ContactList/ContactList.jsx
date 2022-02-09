import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = ({ contacts, removeContact }) => {
  return (
    <ul className={s.list}>
      {' '}
      {contacts.map(el => (
        <li className={s.item} key={el.id}>
          <h3 className={s.name}>{el.name}</h3>
          <p className={s.number}>{el.number}</p>
          <button
            className={s.buttom}
            type="button"
            onClick={e => removeContact(el.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
export default ContactList;
