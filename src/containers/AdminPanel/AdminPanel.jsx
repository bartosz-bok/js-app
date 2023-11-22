import { useCallback, useState } from 'react';
import styles from './styles.module.css';
import AddEventForm from '../../components/AddEventForm';
import { Link } from 'react-router-dom';
import { EventTable } from '../../components/EventTable';

export const AdminPanel = () => {
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const handleAddEventClick = () => {
    setIsAddingEvent((prevState) => !prevState);
  };

  const hideAddEventForm = useCallback(() => {
    setIsAddingEvent(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.buttonContainer}>
          <div className={styles.leftButtons}>
            <button className={styles.button} onClick={handleAddEventClick}>
              Add Event
            </button>
            <div className={styles.button}>
              <Link to="/">Go to Main Page</Link>
            </div>
          </div>
        </div>
        {isAddingEvent && <AddEventForm hideAddEventForm={hideAddEventForm} />}
        <EventTable />
      </div>
    </div>
  );
};
