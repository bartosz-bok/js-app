import { useState } from 'react';
import styles from './styles.module.css';
import { changePassword } from '../../api';

export const PasswordResetForm = ({ hideChangePasswordForm }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await changePassword(newPassword);

      setNewPassword('');
      setConfirmNewPassword('');
      hideChangePasswordForm();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleResetPassword}>
      <label className={styles.label}>
        New Password:
        <input
          className={styles.input}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Confirm New Password:
        <input
          className={styles.input}
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} type="submit">
        Reset Password
      </button>
    </form>
  );
};
