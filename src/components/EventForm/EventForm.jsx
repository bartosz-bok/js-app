import styles from './styles.module.css';

export const EventForm = ({
  eventName,
  setEventName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  description,
  setDescription,
  imageUrl,
  setImageUrl,
  categoryId,
  setCategoryId,
  error,
  onSubmit,
}) => {
  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <label className={styles.label}>
        Event Name:
        <input
          className={styles.input}
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
      </label>
      <label className={styles.label}>
        Start Date:
        <input
          className={styles.input}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label className={styles.label}>
        End Date:
        <input
          className={styles.input}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <label className={styles.label}>
        Description:
        <textarea
          type="textarea"
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label className={styles.label}>
        Image URL:
        <input
          className={styles.input}
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Category ID:
        <input
          className={styles.input}
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        />
      </label>
      {error && <p className={styles.error}>{error.message}</p>}
      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
};
