import { create } from 'zustand';

const initialState = [
  {
    id: 1,
    eventName: 'I wojna swiatowa',
    startDate: '1914-07-28',
    endDate: '1918-11-11',
    description:
      'Pierwsza wojna swiatowa wybuchka na skutek skomplikowanego systemu sojuszniczego i narastajacych napiec w Europie, zwiazanych z terytorialnymi roszczeniami, zbrojeniami i konkurencja imperialistyczna. Konflikt przyniosl ogromne straty ludzkie, z milionami ofiar. Jego zakonczenie w 1918 roku wplynelo na ksztaltowanie sie nowego porzadku politycznego i spolecznego na arenie miedzynarodowej.',
    imageUrl:
      'https://assets.editorial.aetnd.com/uploads/2009/10/world-war-one-gettyimages-90007631.jpg',
    categoryId: 1,
  },
  {
    id: 2,
    eventName: 'II wojna swiatowa',
    startDate: '1939-09-01',
    endDate: '1945-09-02',
    description:
      'Druga wojna swiatowa trwaka od 1939 do 1945 roku i byla globalnym konfliktem zbrojnym, w ktorym uczestniczyly glowne mocarstwa swiata. Wybuchla po inwazji Niemiec na Polske, co spowodowalo reakcje ze strony Wielkiej Brytanii i Francji. Konflikt zakonczyl sie kapitulacja Niemiec i Japonii w 1945 roku.',
    imageUrl:
      'https://cdn.britannica.com/26/188426-050-2AF26954/Germany-Poland-September-1-1939.jpg',
    categoryId: 1,
  },
  {
    id: 3,
    eventName: 'Wojna wietnamska',
    startDate: '1955-11-01',
    endDate: '1975-04-30',
    description:
      'Wojna w Wietnamie trwala od 1955 do 1975 roku i byla jednym z najbardziej skomplikowanych konfliktow zimnej wojny. Stany Zjednoczone wspieraly rzad Poludniowego Wietnamu w walce z komunistyczna Polnoca, angazujac duze sily wojskowe. Wojna jednak zakonczyla sie zwyciestwem Polnocnej strony.',
    imageUrl:
      'https://assets.editorial.aetnd.com/uploads/2009/10/vietnam-war-gettyimages-615208290.jpg',
    categoryId: 5,
  },
];

const useStore = create((set) => ({
  events: initialState,
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, id: Math.round(Math.random() * 10000) }],
    })),
  editEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === event.id ? event : e)),
    })),
}));

export default useStore;
