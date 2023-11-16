import { useCallback, useState } from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { PasswordResetForm } from '../../components/ChangePasswordForm/ChangePasswordForm';
import styles from './styles.module.css';
import { EventEditor } from '../EventEditor/EventEditor';
import AddEventForm from '../../components/AddEventForm';

export const AdminPanel = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}&event_type=login`,
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token: accessToken } = data;
        localStorage.setItem('jwtToken', accessToken);
        setJwtToken(accessToken);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setJwtToken(null);
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword((prevState) => !prevState);
  };

  const hideChangePasswordForm = useCallback(() => {
    setIsChangingPassword(false);
  }, []);

  const handleAddEventClick = () => {
    setIsAddingEvent((prevState) => !prevState);
  };

  const hideAddEventForm = useCallback(() => {
    setIsAddingEvent(false);
  }, []);

  if (!jwtToken) {
    return (
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        error={error}
        handleLogin={handleLogin}
      />
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.buttonContainer}>
            <div className={styles.leftButtons}>
              <button className={styles.button} onClick={handleChangePasswordClick}>
                Change Password
              </button>
              <button className={styles.button} onClick={handleAddEventClick}>
                Add Event
              </button>
            </div>
            <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>
              Logout
            </button>
          </div>
          {isChangingPassword && (
            <PasswordResetForm hideChangePasswordForm={hideChangePasswordForm} />
          )}
          {isAddingEvent && <AddEventForm hideAddEventForm={hideAddEventForm} />}
          <EventEditor />
        </div>
      </div>
    );
  }
};
