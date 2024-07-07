import { useRouteError } from 'react-router-dom';
import PageContent from "../components/PageContent";

function ErrorPage() {
    const error = useRouteError();

    // set these 2 default values but overwrite them with more fitting values based on which error we have
    let title = 'An error occurred';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        // message = error.data.message;
        message = JSON.parse(error.data).message;
    }

    if (error.status === 404) {
        title = 'Not found!'
        message = 'Could not find resource or page'
    }

    return (
        // <h1>An error occurred</h1>
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    )
}

export default ErrorPage;