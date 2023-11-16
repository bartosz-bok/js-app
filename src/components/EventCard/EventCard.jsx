import styles from './styles.module.css';

export const EventCard = ({ event, onEdit, onDelete }) => (
  <div className={styles.eventCard}>
    <img src={event.imageUrl} alt={`Event ${event.id}`} className={styles.eventImage} />
    <div className={styles.eventDetails}>
      <h2>{event.eventName}</h2>
      <p>Start Date: {event.startDate}</p>
      <p>End Date: {event.endDate}</p>
      <p>Description: {event.description}</p>
      <p>Category ID: {event.categoryId}</p>
      <div className={styles.buttonContainer}>
        <button className={styles.editButton} onClick={() => onEdit(event.id)}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={() => onDelete(event.id)}>
          Delete
        </button>
      </div>
    </div>
  </div>
);
