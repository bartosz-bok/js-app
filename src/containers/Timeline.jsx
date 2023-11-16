import { Error } from '../components/Error';
import { TimelineComponent } from '../components/Timeline';
import { getEventsForTimeline } from '../api';
import { useFetch } from '../hooks/useFetch';
import { GridLoader } from 'react-spinners';
import { mapRawToEvents, mapRawToTimeline } from '../utils/eventsMappers';
import { DownloadPDFButton } from '../components/DownloadPdfButton/DownloadPdfButton';

export const Timeline = () => {
  const { data: events, hasError, isLoading } = useFetch(getEventsForTimeline);

  if (isLoading) {
    return <GridLoader loading={isLoading} />;
  }
  if (hasError) {
    return <Error errorText="Service unavailable, please try again later" />;
  }
  return (
    <>
      <DownloadPDFButton data={mapRawToEvents(events)} />
      <TimelineComponent data={mapRawToTimeline(events)} />;
    </>
  );
};
