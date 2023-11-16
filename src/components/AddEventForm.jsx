import { useState } from 'react';
import { addEvent } from '../api';
import { EventForm } from './EventForm';

const AddEventForm = ({ hideAddEventForm }) => {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setError('');

    if (new Date(startDate) > new Date(endDate)) {
      setError('End date must be equal to or after the start date.');
      return;
    }

    try {
      await addEvent({
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
      hideAddEventForm();
      setTimeout(() => window.location.reload(), 500); // TODO: replace with a more React-y way
    } catch (error) {
      setError(error);
    }
  };

  return (
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
  );
};

export default AddEventForm;
