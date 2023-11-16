import { useState } from 'react';
import { EventForm } from '../EventForm/';
import styles from './styles.module.css';
import { editEvent } from '../../api';

export const EventEditModal = ({ isOpen, onClose, eventData }) => {
  const [eventName, setEventName] = useState(eventData?.eventName);
  const [startDate, setStartDate] = useState(eventData?.startDate);
  const [endDate, setEndDate] = useState(eventData?.endDate);
  const [description, setDescription] = useState(eventData?.description);
  const [imageUrl, setImageUrl] = useState(eventData?.imageUrl);
  const [categoryId, setCategoryId] = useState(eventData?.categoryId);
  const [error, setError] = useState('');

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setError('');

    if (new Date(startDate) > new Date(endDate)) {
      setError('End date must be equal to or after the start date.');
      return;
    }

    try {
      await editEvent({
        id: eventData.id,
        eventName,
        startDate,
        endDate,
        description,
        imageUrl,
        categoryId,
      });

      setEventName('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      setImageUrl('');
      setCategoryId('');
      onClose();
      // window.location.reload(); // TODO: replace with a more React-y way
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.showModal : ''}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <EventForm
          eventName={eventName}
          setEventName={setEventName}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          description={description}
          setDescription={setDescription}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          error={error}
          onSubmit={handleAddEvent}
        />
      </div>
    </div>
  );
};
