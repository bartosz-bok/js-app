import styles from './styles.module.css';
import PropTypes from 'prop-types';


export const Error = ({ errorText }) => {
  return (
    <div className={styles.card}>
      <p className={styles.text}>{errorText}</p>
    </div>
  );
};

Error.propTypes = {
  errorText: PropTypes.string.isRequired,
};
