// import { useEffect, useState } from "react";
// import { useFetch } from "../hooks/useHttp.js"
// import { fetchAvailableMeals } from "../http"
import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Meals() {
    const {
        data: loadedMeals, // data will be undefined until the request is done, which is the reason why the map function below results in an error
        isLoading,
        error,
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    console.log(loadedMeals);
    // const [loadedMeals, setLoadedMeals] = useState([]);

    // fetch list of meals
    // since we've written the code in the useHttp.js, we can erase this code and use the code written there
    // useEffect(() => {
    //     async function fetchMeals() {
    //         const response = await fetch('http://localhost:3000/meals');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch meals');
    //         }
    //         const meals = await response.json();
    //         setLoadedMeals(meals);
    //     }

    //     fetchMeals();
    // }, []);

    if (isLoading) {
        return <p className="center">Fetching meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}