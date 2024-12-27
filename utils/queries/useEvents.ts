import { useQuery } from 'react-query';
import client from './../sanity/client';

const fetchEvents = async () => {
  const query = '*[_type == "event"]'; // Adjust to your Sanity query to fetch events
  const events = await client.fetch(query);
  return events;
};

const useEvents = () => {
  return useQuery('events', fetchEvents);
};

export default useEvents;