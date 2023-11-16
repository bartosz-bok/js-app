import { mapEventsToRaw, mapRawToEvents } from '../utils/eventsMappers';

export const getEventsForTimeline = async () => {
  let formData = new FormData();
  formData.append('event_name', 'display_events');
  return fetch('/api', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: formData,
  })
    .then((res) => res.json())
    // .then((data) => mapRawToTimeline(data));
};

export const getEvents = async () => {
  let formData = new FormData();
  formData.append('event_name', 'display_events');
  return fetch('/api', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => mapRawToEvents(data));
};

export const changePassword = async (newPassword) => {
  const accessToken = localStorage.getItem('jwtToken');

  let formData = new FormData();
  formData.append('event_type', 'change_password');
  formData.append('username', 'admin');
  formData.append('new_password', newPassword);
  formData.append('access_token', accessToken);

  fetch('/api', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      alert(result);
    })
    .catch(() => {
      throw new Error('Something went wrong. Please try again later.');
    });
};

export const addEvent = async (event) => {
  const rawEvent = mapEventsToRaw([event])[0];
  const formData = new FormData();

  for (const key in rawEvent) {
    formData.append(key, rawEvent[key]);
  }

  formData.append('event_type', 'add_event');

  const accessToken = localStorage.getItem('jwtToken');
  formData.append('access_token', accessToken);

  fetch('/api', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      alert(result);
    })
    .catch((error) => {
      alert(error);
    });
};

export const editEvent = async (event) => {
  const rawEvent = mapEventsToRaw([event])[0];
  const formData = new FormData();

  for (const key in rawEvent) {
    formData.append(key, rawEvent[key]);
  }

  formData.append('event_type', 'change_event');

  const accessToken = localStorage.getItem('jwtToken');
  formData.append('access_token', accessToken);

  fetch('/api', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      alert(result);
    })
    .catch((error) => {
      alert(error);
    });
};

export const deleteEvent = async (eventId) => {
  const formData = new FormData();
  formData.append('event_type', 'delete_event');
  formData.append('event_id', eventId);

  const accessToken = localStorage.getItem('jwtToken');
  formData.append('access_token', accessToken);

  fetch('/api', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      alert(result);
    })
    .catch((error) => {
      alert(error);
    });
};
