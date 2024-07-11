import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../util/http.js';

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({ // this hook sends HTTP request behind the scenes, get us the events data that we need and give us info about the loading state
    queryKey: ['events', { max: 3 }],                         // set the key
    // queryFn: ({ signal }) => fetchEvents({ signal, max: 3 }), // query that will be executed
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }), // can be rewritten this way to acces the max: 3
    staleTime: 5000,                                          // able to control the behavior that we want (time)... default is 0
    // gcTime: 3000,                                          // controls how long the cached data is kept... default 5m
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events'} // info property added `error.info = await response.json();`
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
