import { useCallback, useEffect, useState } from "react";
import { fetchAvailableMeals } from "../http.js";

// export function useFetch({ initialValue }) {
//     const [isFetching, setIsFetching] = useState(false);
//     const [error, setError] = useState();
//     const [fetchedData, setFetchedData] = useState(initialValue);

//     useEffect(() => {
//         async function fetchData() {
//             setIsFetching(true);
//             try {
//                 const response = fetchAvailableMeals();
//                 setFetchedData(response);
//                 console.log('response:', response);
//             } catch (error) {
//                 setError({ message: error.message || 'Failed to fetch data' });
//             }
//             setIsFetching(false);
//         }

//         fetchData();
//     }, []);

//     return {
//         isFetching,
//         error,
//         fetchedData,
//         setFetchedData
//     }
// }

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    // const resData = JSON.stringify(response);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        );
    }
    return resData;
}

export default function useHttp(url, config, initialData) { // third parameter (initialData) should be passed on to 
    const [isLoading, setIsLoading] = useState(initialData);
    const [error, setError] = useState();
    const [data, setData] = useState(initialData);

    // resolving the problem of showing the successful payment when trying to make a second payment
    function clearData() {
        setData(initialData);
    }

    // to make sure that this doesn't go into an infinite loop, we use useCallback
    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try {
                const resData = await sendHttpRequest(url, { ...config, body: data }); // we're setting the data that was received here as back in the component that sends the data, it can't send the data to the body directly
                setData(resData);
            } catch (error) {
                setError(error.message || 'Something went wrong');
            }
            setIsLoading(false);
        }, [url, config]);

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest, // (we can write it in this way, or use useEffect)
        clearData
    };
}