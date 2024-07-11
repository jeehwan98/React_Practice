import { Link, useNavigate, useNavigation, useParams, redirect, useSubmit } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent, queryClient } from '../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const params = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();
  console.log(params.id);

  const { data, error, isError } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent(params, { signal }),
    staleTime: 10000 // make sure that the cached data is used without refetching it behind the scenes if the data is less than 10 seconds old
  })
  console.log(data);
  const navigate = useNavigate();

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;
  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] });
  //     const previousEvent = queryClient.getQueryData(['events', params.id]);

  //     queryClient.setQueryData(['events', params.id], newEvent); // used to manipulate data

  //     return { previousEvent }
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', params.id], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['events', params.id]);
  //   }
  // })

  function handleSubmit(formData) {
    // mutate({ id: params.id, event: formData });
    // navigate('../');
    submit(formData, { method: 'PUT' })
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // if (isPending) {
  //   content = (
  //     <div className='center'>
  //       <LoadingIndicator />
  //     </div>
  //   )
  // }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className='form-actions'>
          <Link to="../" className='button'>
            Okay
          </Link>
        </div>
      </>
    )
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' ? <p>Sending data</p> : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({ params }) { // will receive an object of params
  return queryClient.fetchQuery({
    queryFn: ({ signal }) => fetchEvent(params, { signal }),
    queryKey: ['events', params.id],
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData }); // we can directly call the method from above to here
  // await so that it'll be proceeded once completed
  await queryClient.invalidateQueries(['event']);
  return redirect('../');
}