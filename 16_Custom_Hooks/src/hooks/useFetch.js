import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
    // should manage all the relating states
    const [isFetching, setIsFetching] = useState(false);        // loading state
    const [error, setError] = useState();                       // error state
    const [fetchedData, setFetchedData] = useState(initialValue);


    const [] = useState();

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
            const data = await fetchFn();
            setFetchedData(data);
            } catch (error) {
            setError({message: error.message || 'Failed to fetch data'});
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);
    
    return {
        isFetching,
        fetchedData,
        setFetchedData, // we can return back the setFetchedData
        error
    }
}