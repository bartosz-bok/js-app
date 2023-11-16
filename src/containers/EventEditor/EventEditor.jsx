import { useFetch } from '../../hooks/useFetch';
import { deleteEvent, getEvents } from '../../api';
import { GridLoader } from 'react-spinners';
import { Error } from '../../components/Error';
import { EventCard } from '../../components/EventCard/EventCard';
import styles from './styles.module.css';
import { EventEditModal } from '../../components/EventEditModal';
import { useState } from 'react';

export const EventEditor = () => {
  const { data: events, hasError, isLoading } = useFetch(getEvents);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEditClick = (event) => {
    console.log('handleEditClick', event);
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteClick = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      alert(error);
    }
  };

  if (isLoading) {
    return <GridLoader loading={isLoading} />;
  }
  if (hasError) {
    return <Error errorText="Service unavailable, please try again later" />;
  }
  return (
    <>
      <div className={styles.eventListContainer}>
        <div className={styles.eventList}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => handleEditClick(event)}
              onDelete={() => handleDeleteClick(event.id)}
            />
          ))}
        </div>
      </div>
      {selectedEvent && (
        <EventEditModal
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          eventData={selectedEvent}
        />
      )}
    </>
  );
};
