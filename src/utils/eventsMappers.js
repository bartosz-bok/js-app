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

export const mapRawToTimeline = (events) =>
  events.map((event) => {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    return {
      text: {
        headline: event.event_name,
        text: event.description,
      },
      media: {
        url: event.image_url,
        // caption: 'Mozna dodac podpisy do zdjec tez.',
        thumbnail: getCategoryIcon(event.category_id),
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
