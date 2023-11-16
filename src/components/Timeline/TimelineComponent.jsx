import { Timeline } from '@knight-lab/timelinejs';
import '@knight-lab/timelinejs/dist/css/timeline.css';
import { useEffect, useRef } from 'react';
import events from '../../../data/test.json';
import styles from './styles.module.css';

export const TimelineComponent = ({ data }) => {
  const timelineEl = useRef(null);

  useEffect(() => {
    if (!data) return;
    new Timeline(timelineEl.current, {
      title: events.title,
      events: data,
    });
  }, [data]);

  return (
    <>
      <div className={styles.timeline}>
        <div ref={timelineEl}></div>
      </div>
    </>
  );
};
