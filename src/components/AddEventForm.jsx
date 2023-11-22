import { useState } from 'react';
import { EventForm } from './EventForm';
import useStore from '../store';

const AddEventForm = ({ hideAddEventForm }) => {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');

  const { events, addEvent } = useStore((state) => ({
    addEvent: state.addEvent,
    events: state.events,
  }));

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setError('');

    if (new Date(startDate) > new Date(endDate)) {
      setError('End date must be equal to or after the start date.');
      return;
    }

    addEvent({
      eventName,
      startDate,
      endDate,
      description,
      imageUrl,
      categoryId,
    });

    console.log(events);

    setEventName('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setImageUrl('');
    setCategoryId('');
    hideAddEventForm();
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
