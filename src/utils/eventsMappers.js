const getCategoryIcon = (continentId) => {
  switch (continentId) {
    case 1:
      return 'continents/europe.png';
    case 2:
      return 'continents/northamerica.png';
    case 3:
      return 'continents/southamerica.png';
    case 4:
      return 'continents/africa.png';
    case 5:
      return 'continents/asia.png';
    default:
      return undefined;
  }
};

export const mapEventsToTimeline = (events) =>
  events.map((event) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    return {
      text: {
        headline: event.eventName,
        text: event.description,
      },
      media: {
        url: event.imageUrl,
        thumbnail: getCategoryIcon(event.categoryId),
      },
      start_date: {
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
        year: startDate.getFullYear(),
      },
      end_date: {
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
        year: endDate.getFullYear(),
      },
    };
  });

export const mapRawToEvents = (events) =>
  events.map((event) => ({
    id: event.id,
    eventName: event.event_name,
    startDate: event.start_date,
    endDate: event.end_date,
    description: event.description,
    imageUrl: event.image_url,
    categoryId: event.category_id,
  }));

export const mapEventsToRaw = (events) =>
  events.map((event) => ({
    event_id: event.id,
    event_name: event.eventName,
    start_date: event.startDate,
    end_date: event.endDate,
    description: event.description,
    image_url: event.imageUrl,
    category_id: event.categoryId,
  }));
