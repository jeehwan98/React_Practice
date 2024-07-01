import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../http.js";

export function useFetch({ initialValue }) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const response = fetchAvailableMeals();
                setFetchedData(response);
                console.log('response:', response);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data' });
            }
            setIsFetching(false);
        }

        fetchData();
    }, []);

    return {
        isFetching,
        error,
        fetchedData,
        setFetchedData
    }
}