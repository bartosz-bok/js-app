import { TimelineComponent } from '../components/Timeline';
import { mapEventsToTimeline } from '../utils/eventsMappers';
import { DownloadPDFButton } from '../components/DownloadPdfButton/DownloadPdfButton';
import useStore from '../store';
import { useEffect } from 'react';

export const Timeline = () => {
  const { events } = useStore((state) => ({
    events: state.events,
  }));

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <>
      <DownloadPDFButton data={events} />
      <TimelineComponent data={mapEventsToTimeline(events)} />;
    </>
  );
};
